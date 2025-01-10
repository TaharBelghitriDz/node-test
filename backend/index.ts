import mongoose from "mongoose";
import cluster from "cluster";
import os from "os";
import app from "./src";

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener";

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary process is running. Forking for ${numCPUs} CPUs...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
      console.log(
        `Worker ${process.pid} Connected to db and is running on http://localhost:${PORT}`
      );
    });
  });
}
