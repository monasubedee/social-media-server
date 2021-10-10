import express from 'express';
import { signupUser, signinUser, followUser, getUserInfo } from '../controllers/user.js';
import auth from '../middlewares/auth.js';


const router = express.Router();


router.post('/signup', signupUser);

router.post('/signin', signinUser);

router.get('/:id', getUserInfo);

router.put('/follow/:id',auth, followUser);


export default router;