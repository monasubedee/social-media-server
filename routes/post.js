import express from 'express';
import { createPost, deletePost, getTimelinePosts, updatePost, likePost } from '../controllers/post.js';
import auth from '../middlewares/auth.js';


const router = express.Router();


router.post('/',auth, createPost);

router.put('/:id',auth, updatePost);

router.delete('/:id',auth,deletePost);

router.put('/like/:id', auth, likePost);

router.get('/timeline/all/:id',auth, getTimelinePosts);

export default router;