import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT * FROM likes WHERE postId = ?";
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like => like.userId));
  });
};

export const addLike = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("NOT LOGGED IN!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("TOKEN IS NOT VALID!");

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
    const values = [userInfo.id, req.query.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been liked this post!");
    });
  });
};

export const deleteLike = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT LOGGED IN!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("TOKEN IS NOT VALID");

    const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";
    const values = [userInfo.id, req.query.postId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like has been removed!");
    });
  });
};
