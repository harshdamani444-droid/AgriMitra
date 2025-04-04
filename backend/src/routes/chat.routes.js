import { Router } from 'express';
import { accessChat, createGroupChat, fetchChats, renameGroupChat, addToGroup, removeFromGroup } from '../controllers/chat.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { rename } from 'fs';

const router = Router();
router.post("/create", verifyJWT, accessChat);
router.get("/get", verifyJWT, fetchChats);
router.post("/createGroup", verifyJWT, createGroupChat);
router.put("/renameGroup", verifyJWT, renameGroupChat);
router.put("/addToGroup", verifyJWT, addToGroup);
router.put("/removeFromGroup", verifyJWT, removeFromGroup);
export default router;