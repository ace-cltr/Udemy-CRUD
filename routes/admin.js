import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.js";
const router = Router();
import { Admin, Course } from "../db/index.js";

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({ username: password })
    .then(() => {
      res.status(200).json({
        message: `Admin ${username} created successfully`,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/courses", adminMiddleware, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  Course.create({ title, description, price, imageLink })
    .then((el) => {
      res.status(200).json({
        message: `${title} added successfully`,
        id: el._id,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/courses", adminMiddleware, (req, res) => {
  Course.find()
    .then((courses) => {
      res.status(200).json({
        courses,
      });
    })
    .catch((err) => console.log(err));
});

export { router };
