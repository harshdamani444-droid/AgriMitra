import { Server } from "socket.io";

const users = {}; // Store user socket IDs
const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Allow frontend access
            methods: ["GET", "POST"],
        },
        pingTimeout: 60000,
    });

    io.on("connection", (socket) => {
        console.log(`⚡ User Connected:`);

        // Store user socket ID
        socket.on("setup", (userData) => {
            socket.join(userData);
            socket.emit("connected");
            console.log(`🟢 User ${userData} connected `);
        });

        socket.on("joinChat", (room) => {
            socket.join(room);
            console.log(`🟢 User joined room: ${room}`);
        });

        socket.on("newMesssage", (newMesssage) => {
            console.log("newMesssage", newMesssage);
            var chat = newMesssage.chat;
            if (!chat.users) return;
            chat.users.forEach((user) => {
                if (user == newMesssage.sender._id) return;
                socket.to(user).emit("messageReceived", newMesssage);
                // console.log("emmited", user);

            });
        });
        socket.on("typing", (room) => {
            socket.to(room).emit("typing");
        });
        socket.on("stopTyping", (room) => {
            console.log("stopTyping", room);
            socket.to(room).emit("stopTyping")
        });
        socket.on("disconnect", (userData) => {
            console.log("User Disconnected");
            socket.leave(userData);
        });
    });

    return io;
};

export default setupSocket;
