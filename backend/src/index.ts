import express from "express";

import urlRoutes from "./routes/urlRoutes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);

app.use("/api", urlRoutes);

export default app;
