import mongoose, { Document, Schema } from "mongoose";

export interface IContent extends Document {
    heading: string;
    description: string;
    image: string;
}

const BannerSchema = new Schema<IContent>(
    {
        heading: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Banner = mongoose.model<IContent>("Banner", BannerSchema);