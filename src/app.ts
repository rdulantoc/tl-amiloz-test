import cors from "cors";
import express from "express";
import { mainRouter } from "./routes";

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use("/", mainRouter);

const port = 3000;

app.listen(port);
console.log(`Listening on port: ${port}`);
