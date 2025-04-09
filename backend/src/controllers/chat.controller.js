import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        throw new ApiError(400, "UserId Required", null);
    }
    let chat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    if (chat.length > 0) {
        chat = chat[0];
        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            message: "Chat Fetched",
            data: chat,
            success: true,
        }));
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [String(req.user._id), userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            return res.status(200).json(new ApiResponse({
                statusCode: 200,
                message: "New Chat Created",
                data: FullChat,
                success: true,
            }));
        } catch (error) {
            res.status(400);
            throw new ApiError(400, "Chat Creation Failed", error);
        }
    }



}

)

const fetchChats = asyncHandler(async (req, res) => {
    try {
        const data = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            message: "Chats Fetched",
            data: data,
            success: true,
        }));
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }


});

const createGroupChat = asyncHandler(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        next(new ApiError(400, "Please fill all the fields", null));
        return;
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        next(new ApiError(400, "More than 2 users are required to form a group chat", null));
        return;
    }

    users.push(String(req.user._id));

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            message: "Group Chat Created",
            data: fullGroupChat,
            success: true,
        }));
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroupChat = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(404).json(new ApiResponse({
            statusCode: 404,
            message: "Chat Not Found",
            data: null,
            success: false,
        }));
    }

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        message: "Group Chat Renamed",
        data: updatedChat,
        success: true,
    }));
});


const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
        return res.status(404).json(new ApiResponse({
            statusCode: 404,
            message: "Chat Not Found",
            data: null,
            success: false,
        }));
    }
    console.log(userId)
    console.log(chat);
    const alreadyExists = chat.users.find((u) => u._id.toString() === userId);

    if (alreadyExists) {
        return res.status(400).json(new ApiResponse({
            statusCode: 400,
            message: "User Already Exists",
            data: null,
            success: false,
        }));
    }
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(404).json(new ApiResponse({
            statusCode: 404,
            message: "Chat Not Found",
            data: null,
            success: false,
        }));
    }

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        message: "User Added to Group",
        data: updatedChat,
        success: true,
    }));
}
);


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(404).json(new ApiResponse({
            statusCode: 404,
            message: "Chat Not Found",
            data: null,
            success: false,
        }));
    }

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        message: "User Removed from Group",
        data: updatedChat,
        success: true,
    }));
}
);

export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroup,
    removeFromGroup,
}