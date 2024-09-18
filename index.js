import express from "express";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('Backend is running on port: ', port);
})

