import { Router } from "express";
import { userMiddleware } from "../middleware/user.js";
import { Course, User } from "../db/index.js";
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

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  const ID = req.params.courseId;
  const username = req.headers.username;
  Course.updateOne({ username }, { $push: { purchasedCourse: ID } })
    .then(() =>
      res.status(200).json({
        message: "course purchase successful",
      })
    )
    .catch((err) => console.log(err));
});

router.get("/purchasedCourse", userMiddleware, (req, res) => {
  const username = req.header.username;
  User.findOne({ username })
    .then((users) => {
      Course.find({ _id: { $in: users.purchasedCourse } });
    })
    .then((message) =>
      res.status(200).json({
        message,
      })
    )
    .catch((err) => console.log(err));
});

export { router };
