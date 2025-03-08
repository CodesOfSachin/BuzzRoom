import Message from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from "fs";
import path from "path";

export const getMessages = async (request, response, next) => {
    try {
        const user1 = request.userId;
        const user2 = request.body.id;

        if (!user1 || !user2) {
            return response.status(400).json({ error: "Both user IDs are required." });
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },
            ],
        }).sort({ timestamp: 1 });

        return response.status(200).json({ messages });
    } catch (error) {
        console.error("Error in getMessages:", error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const uploadFile = async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).json({ error: "File is required." });
        }

        const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".docx", ".mp4", ".mp3"];
        const fileExt = path.extname(request.file.originalname).toLowerCase();

        if (!allowedExtensions.includes(fileExt)) {
            return response.status(400).json({ error: "Invalid file type." });
        }

        const date = Date.now();
        const fileDir = path.join("uploads", "files", date.toString());
        const fileName = path.join(fileDir, request.file.originalname);

        mkdirSync(fileDir, { recursive: true });

        try {
            renameSync(request.file.path, fileName);
        } catch (error) {
            console.error("Error moving file:", error);
            return response.status(500).json({ error: "Failed to save file." });
        }

        return response.status(200).json({ filePath: fileName });
    } catch (error) {
        console.error("Error in uploadFile:", error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};
