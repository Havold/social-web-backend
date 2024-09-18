import express from "express";

const router = express.Router();

router.get('/:postId', (req, res) => {
    res.send('Hello from User route');
})

export default router;