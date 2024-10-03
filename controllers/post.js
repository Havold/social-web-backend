import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  // VERIRY LOGGED IN
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = req.query.userId;
    let q, values;
    if (userId === undefined) {
      q =
        "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY createdAt DESC";
      values = [userInfo.id, userInfo.id];
    } else {
      q =
        "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) WHERE u.id = ? ORDER BY createdAt DESC";
      values = [userId];
    }

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES(?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH::mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("New post has been created!");
    });
  });
};

export const deletePost = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT LOGGED IN");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(405).json("TOKEN IS NOT VALID");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";
    db.query(q, [req.params.postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted!");
      return res.status(403).json("You can only delete your post!");
    });
  });
};
