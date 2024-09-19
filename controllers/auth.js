import { db } from "../connect.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    // CHECK USER
    let q = 'SELECT * FROM users WHERE username = ?';
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(404).json(err);
        if (data.length===0) return res.status(404).json('User not found!');
        
        console.log(data[0])

        const checkedPassword = bcryptjs.compareSync(req.body.password, data[0].password);

        if (!checkedPassword) return res.status(400).json('Wrong password!');

        const token = jwt.sign({id: data[0].id}, 'secretKey');

        const {password, ...others} = data[0];
        
        res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: "none",
    }).status(200).json('User has been logged out!')
}