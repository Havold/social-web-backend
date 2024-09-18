import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import dotenv from 'dotenv'


dotenv.config()

const app = express();

// USE MIDDLEWARES

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('Backend is running on port: ', port);
})

