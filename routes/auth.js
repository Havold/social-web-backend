import express from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', (req, res) => {

})

router.post('/register', register)

router.post('/logout', (req, res) => {
    
})

export default router;