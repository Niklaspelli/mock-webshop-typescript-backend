import { db } from "./db/db.ts";
import { PORT } from "./config.ts";
import app from "./service.ts";

db.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
  console.log("MySQL DB is connected!");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Failed to start the server ${err}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
