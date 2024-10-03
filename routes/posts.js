import express from "express";
import { addPost, deletePost, getPosts } from "../controllers/post.js";

const router = express.Router();

router.get('/', getPosts)
router.post('/', addPost)
router.delete('/:postId', deletePost)

export default router;