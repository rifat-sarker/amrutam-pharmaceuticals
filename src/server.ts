import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { startScheduler } from "./app/modules/Scheduler/scheduler.job";

async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);

    // Start the scheduler
    startScheduler();
    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error starting the application:", error);
  }
}

main();
