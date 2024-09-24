import {db} from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE id = ?';
    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0])
    })
}