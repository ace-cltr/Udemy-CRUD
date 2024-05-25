import mongoose from "mongoose";
import "dotenv/config";

// CONNECTING DATABASE --------
const DB = process.env.DB_STRING;
mongoose.connect(DB);

// ADMIN Schema --------
const AdminSchema = new mongoose.Schema({
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

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

export { Admin, User, Course };
