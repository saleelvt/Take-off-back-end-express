// main file (e.g., index.ts)

import "module-alias/register";
import { db } from "./boot/db";
import dotenv from "dotenv";

import app from "@/presentation/server";


dotenv.config(); // Load environment variables




// export const insertAdmin = async () => {
//   const sampleAdmin = {
//     userName: "takeoff",
//     email: "takeoffcaravan@gmail.com",
//     password: "admin@takeoff",
//   };
//   // Insert logic for saving admin to the database if required here

//   try {
//   const existingAdmin = await (Admin as mongoose.Model<AdminEntity>).findOne({ 
//   email: sampleAdmin.email 
// });
//     if (!existingAdmin) {
//       const newAdmin = new Admin(sampleAdmin);
//       await newAdmin.save();
//       console.log("this is the admin now ", newAdmin);
//     } else {
//       console.log(" ADMIN ALLREDY EXISTED  ");
//     }
//   }  catch (error) {
//     console.error("Failed to insert sample admin:", error);
//   }
// };

(async () => {
  try {
    console.log("Initializing server and database connection...");
    // Start database connection
    await db()
      .then(() => console.log("Database connected in index page finish"))
      .catch((error: any) => {
        console.error("Error while connecting MongoDB", error);
        process.exit(0); // Exit on DB connection failure
      });
// Start the server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
  } catch (error: any) {
    console.log("Error on start up: ", error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("Server is shutting down...");
      process.exit();
    });
  }
})();

// insertAdmin()
