import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./routes/user.route";
import taskRoute from "./routes/task.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", userRoute);
app.use("/api/v1", taskRoute);

app.get("/", (_req, res) => {
  res.send(`Api connected cuyy di port: ${port}`);
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
