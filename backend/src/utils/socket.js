import { Server } from "socket.io";


const users = {}; // Store user socket IDs

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Allow frontend access
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`⚡ User Connected: ${socket.id}`);

        // Store user socket ID
        socket.on("join", (userId) => {
            users[userId] = socket.id;
            console.log(`🟢 User ${userId} connected with socket ID: ${socket.id}`);
        });

        // Handle message sending
        socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
            const chatMessage = new Chat({ senderId, receiverId, message });
            await chatMessage.save();

            if (users[receiverId]) {
                io.to(users[receiverId]).emit("receiveMessage", chatMessage);
            }
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    console.log(`🔴 User ${userId} disconnected`);
                    delete users[userId];
                    break;
                }
            }
        });
    });

    return io;
};

export default setupSocket;
