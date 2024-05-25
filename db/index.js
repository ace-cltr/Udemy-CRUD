import mongoose from "mongoose";
import "dotenv/config";

// CONNECTING to DATABASE --------
const DB = process.env.DS_STRING;
mongoose.connect(DB, () => console.log("DB connection successful"));

// ADMIN Schema --------
const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: Number, required: true },
});

// USER Schema --------
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId, // saving course obj id for reference to courseSchema
      ref: "Course",
    },
  ],
});

// COURSE Schema --------
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageLink: String,
});

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports({
  Admin,
  User,
  Course,
});
