import express from "express";

const router = express.Router();

router.get('/:likeId', (req, res) => {
    res.send('Hello from User route');
})

export default router;