import express from "express";
import bodyParser from "body-parser";
import { router as adminRouter } from "./routes/admin.js";
import { router as userRouter } from "./routes/user.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
