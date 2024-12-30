import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    // Initialize the scheduler after database connection
    // SchedulerJob.start();
  } catch (error) {
    console.log("Error starting the application:", error);
  }
}

main();
