import { Router } from "express";
import userMiddleware from "../middleware/user.js";
import { Course, User } from "./db";
const router = Router();

router.post("/user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({ username: password })
    .then(() => {
      res.status(200).json({
        message: `User ${username} created successfully`,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/courses", (req, res) => {
  Course.find()
    .then((courses) => {
      res.status(200).json({
        courses,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
