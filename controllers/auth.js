import { db } from "../connect.js";
import bcryptjs from 'bcryptjs'

export const register = (req, res) => {
    // CHECK USER
    let q = 'SELECT * FROM users WHERE username = ?';
    db.query(q, [req.body.username], (err, result) => {
        if (err) return res.status(404).json(err);
        if (result.length) {
            return res.status(403).json('Account already exists');
        }

        // CREATE NEW USER
        // HASH PASSWORD
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(req.body.password, salt);

        q = 'INSERT INTO users (username, email, password, name) VALUES (?)';
        const values = [req.body.username, req.body.email, hashPassword, req.body.name];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(404).json(err);
            return res.status(200).json('New user has been created!');
        })
    })
}

export const login = (req, res) => {
    
}

export const logout = (req, res) => {
    
}