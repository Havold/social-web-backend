import {db} from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE id = ?';
    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0])
    })
}

export const updateUser = (req, res) => {
    // VERIFY LOGGED IN
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('NOT LOGGED IN!');
    
    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('TOKEN IS NOT VALID!');
        
        const q = 'UPDATE users SET `name` = ? , `username` = ?, `email` = ?, `city`=?, `website`=?, `phone`=?, `coverPic`=?, `profilePic`=? WHERE id = ?';
        const values = [
            req.body.name,
            req.body.username,
            req.body.email,
            req.body.city,
            req.body.website,
            req.body.phone,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id,
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows>0) return res.status(200).json('User has been updated!');
            return res.status(403).json('You can only update your profile!')
        })
    })
}