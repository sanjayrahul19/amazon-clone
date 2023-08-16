import express from "express";
import { connectDB } from "./config/db";
import { router } from "./router/router";
import { config } from "dotenv";
import cors from "cors"
config()

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());

connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is up and running " + PORT);
});


