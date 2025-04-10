import { generateInvoice } from "./generateInvoice.js";
import path from "path";

const sampleOrder = {
    _id: "67f7769dc8a7493bcb1d30e8",
    deliveryInfo: {
        fullName: "Nisharg Soni",
        address: "64/A, Nandanvan Township",
        city: "Sidhpur, Patan",
        state: "Gujarat",
        pincode: "384151",
        phone: "12",
    },
    shippingPrice: 3230,
    orderStatus: "Pending",
    orderItems: [
        {
            product: "67f6bfd061c9be6cba345d05",
            quantity: 1,
            _id: "67f7769dc8a7493bcb1d30e9",
            productDetails: {
                _id: "67f6bfd061c9be6cba345d05",
                farmer: {
                    _id: "67f6b83361c9be6cba345c92",
                    name: "Farmer 2",
                    email: "farmer2@gmail.com",
                    avatar: "https://res.cloudinary.com/agrimitra/image/upload/v1744222360/plnkc26batchgpl1q4a0.jpg",
                },
                farmName: "Shree Krishna Organic Farm",
                images: [
                    "http://res.cloudinary.com/agrimitra/image/upload/v1744224197/fzd6pn8sxsm9jxflnhkc.jpg",
                ],
                price: 65,
                size: 1,
                unitOfSize: "kg",
                category: "Orange",
            },
        },
        {
            product: "67f6cbf061c9be6cba345d48",
            quantity: 1,
            _id: "67f7769dc8a7493bcb1d30ea",
            productDetails: {
                _id: "67f6cbf061c9be6cba345d48",
                farmer: {
                    _id: "67f6b83361c9be6cba345c92",
                    name: "Farmer 2",
                    email: "farmer2@gmail.com",
                    avatar: "https://res.cloudinary.com/agrimitra/image/upload/v1744222360/plnkc26batchgpl1q4a0.jpg",
                },
                farmName: "Shree Krishna Organic Farm",
                images: [
                    "http://res.cloudinary.com/agrimitra/image/upload/v1744227301/mrqvlvtrg6ptxz46ajjb.jpg",
                ],
                price: 3000,
                size: 25,
                unitOfSize: "kg",
                category: "Rice",
            },
        },
        {
            product: "67f6d15561c9be6cba345dd6",
            quantity: 1,
            _id: "67f7769dc8a7493bcb1d30eb",
            productDetails: {
                _id: "67f6d15561c9be6cba345dd6",
                farmer: {
                    _id: "67f698099463b12a221f5f7b",
                    name: "Farmer 1",
                    email: "farmer1@gmail.com",
                    avatar: "https://res.cloudinary.com/agrimitra/image/upload/v1744214014/wpaokgirtfz9pjdekhvm.avif",
                },
                farmName: "Green Fields Agro Farm",
                images: [
                    "http://res.cloudinary.com/agrimitra/image/upload/v1744228682/v0xgc3nhof9aotjjdpc5.jpg",
                ],
                price: 65,
                size: 1,
                unitOfSize: "kg",
                category: "Soybeans",
            },
        },
    ],
    createdAt: "2025-04-10T07:43:25.922Z",
    updatedAt: "2025-04-10T07:43:25.922Z",
    totalAmount: 3130,
};

const outputPath = path.join("./sample-invoice.pdf");

(async () => {
    try {
        console.log("Generating sample invoice...");
        await generateInvoice(sampleOrder, outputPath);
        console.log(`Sample invoice generated successfully at: ${outputPath}`);
    } catch (error) {
        console.error("Error generating invoice:", error);
    }
})();