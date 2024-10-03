import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  const q =
    "SELECT c.*, profilePic, name FROM comments AS c JOIN users AS u ON (c.userId = u.id) WHERE c.postId = ? ORDER BY createdAt DESC";
  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
    // VERIFY LOGGED IN
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('NOT LOGGED IN!');
    
    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('TOKEN IS NOT VALID!');
        
        const q = 'INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)';
        const values = [
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.params.postId,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('A new comment has been added!')
        })
    })
}