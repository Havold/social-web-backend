import express from "express";
import { addLike, deleteLike, getLikes } from "../controllers/like.js";

const router = express.Router();

router.get('/:postId', getLikes)
router.post('/:postId', addLike)
router.delete('/:postId', deleteLike)

export default router;