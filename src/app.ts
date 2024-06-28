import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { mainRouter } from "./routes";
import swaggerDocs from "./utils/swagger";

dotenv.config();
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use("/", mainRouter);

const port = Number(process.env.PORT) ?? 3000;

app.listen(port, async () => {
  console.log(`Listening on port: ${port}`);
  swaggerDocs(app, port);
});
