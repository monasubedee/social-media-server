import express from 'express';
import { createConversation ,getConversations} from '../controllers/conversation.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

router.post('/',auth, createConversation);

router.get('/:id',auth, getConversations);


export default router;