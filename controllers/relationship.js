import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationship = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT LOGGED IN!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("TOKEN IS NOT VALID!");

    const q =
      "SELECT followedUserId FROM relationships WHERE followerUserId = ?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((user) => user.followedUserId));
    });
  });
};
export const addRelationship = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT LOGGED IN!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("TOKEN IS NOT VALID!");

    const q =
      "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
    const values = [userInfo.id, req.query.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been followed!");
    });
  });
};
export const deleteRelationship = (req, res) => {
  // VERIFY LOGGED IN
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("NOT LOGGED IN!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("TOKEN IS NOT VALID!");

    const q =
      "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been unfollowed");
    });
  });
};
