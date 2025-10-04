"use strict";
// main file (e.g., index.ts)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const db_1 = require("./boot/db");
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("@/presentation/server"));
dotenv_1.default.config(); // Load environment variables
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Initializing server and database connection...");
        // Start database connection
        yield (0, db_1.db)()
            .then(() => console.log("Database connected in index page finish"))
            .catch((error) => {
            console.error("Error while connecting MongoDB", error);
            process.exit(0); // Exit on DB connection failure
        });
        // Start the server
        const PORT = Number(process.env.PORT) || 3000;
        server_1.default.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error on start up: ", error);
    }
    finally {
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Server is shutting down...");
            process.exit();
        }));
    }
}))();
// insertAdmin()
