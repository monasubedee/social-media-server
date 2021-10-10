import express from 'express';
import auth from '../middlewares/auth.js';
import { getMessages, saveMessage} from '../controllers/message.js';


const router = express.Router();

router.post('/', auth, saveMessage);

router.get('/:id', auth, getMessages);


export default router;