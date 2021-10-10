import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { MONGODB_URL } from "./utils/config.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import conversationRoute from './routes/conversation.js';
import messageRoute from './routes/message.js';
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 5000 || process.env.PORT;

app.use("/images", express.static("public/images"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/conversations", conversationRoute);
app.use("/messages",messageRoute);

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))
  )
  .catch((err) => console.log(err));
