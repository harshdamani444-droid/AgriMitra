import { Worker } from "bullmq";
import Redis from "ioredis";
import path from "path";
import { generateInvoice } from "../utils/generateInvoice.js";
import { sendMail } from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import fs from "fs";

// Create a **new Redis instance** for BullMQ Worker
// console.log("Redis Host:", process.env.REDIS_HOST);
const bullRedisConnection = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,


});

// Create the worker
const worker = new Worker(
    "invoiceQueue",
    async (job) => {
        const order = job.data.order;
        const user = job.data.user;

        console.log("Processing job:", job.id);
        const outputPath = path.join(
            process.cwd(),
            `invoices/invoice-${order._id}.pdf`
        );

        await generateInvoice(order, outputPath);

        await sendMail({
            to: user.email,
            subject: "Your Invoice from Agrimitra",
            content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Agrimitra</h1>
                <p style="margin: 0; font-size: 16px;">Your Trusted Partner in Agriculture</p>
            </div>
            <div style="padding: 20px;">
                <h2 style="color: #333;">Hello ${user.name},</h2>
                <p style="color: #555; font-size: 14px;">Thank you for your order! Please find your invoice attached below.</p>
                <div style="margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h3 style="margin: 0; color: #333;">Order Summary</h3>
                    <p style="margin: 5px 0; color: #555; font-size: 14px;">Order ID: <strong>${order._id}</strong></p>
                    <p style="margin: 5px 0; color: #555; font-size: 14px;">Order Date: <strong>${new Date(order.createdAt).toLocaleDateString()}</strong></p>
                    <p style="margin: 5px 0; color: #555; font-size: 14px;">Total Amount: <strong>₹${order.shippingPrice.toFixed(2)}</strong></p>
                </div>
                <p style="color: #555; font-size: 14px;">If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@agrimitra.in" style="color: #4CAF50; text-decoration: none;">support@agrimitra.in</a>.</p>
            </div>
            <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #777; font-size: 12px;">
                <p style="margin: 0;">Thank you for choosing Agrimitra!</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Agrimitra. All rights reserved.</p>
            </div>
        </div>
    `,
            isHtml: true,
            attachments: [
                {
                    filename: "invoice.pdf",
                    path: outputPath,
                },
            ],
        });
        console.log("Invoice sent to:", user.email);
        fs.unlinkSync(outputPath);
        console.log("Invoice file deleted:", outputPath);

    },
    {
        connection: bullRedisConnection,
    }
);
