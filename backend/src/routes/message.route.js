import { Router } from 'express';
import { sendMessage, allMessages } from '../controllers/message.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { all } from 'axios';


const router = Router();
router.route('/sendMessage').post(verifyJWT, sendMessage); 3
router.route('/:chatId').get(verifyJWT, allMessages);
export default router;