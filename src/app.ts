import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { mainRouter } from "./routes";

dotenv.config();
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use("/", mainRouter);

const port = process.env.PORT ?? 3000;

app.listen(port);
console.log(`Listening on port: ${port}`);
