import { AdminEntity } from "@/domain/entities";
import mongoose, { Model, Schema } from "mongoose";

const adminSchema = new Schema<AdminEntity>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "salon"],
      default: "admin",
    },
    userList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

// Better typing approach
export const Admin: Model<AdminEntity> = 
  (mongoose.models.Admin as Model<AdminEntity>) || 
  mongoose.model<AdminEntity>("Admin", adminSchema);