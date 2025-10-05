import mongoose, { Document, Schema } from "mongoose";

export interface IFounderProfile extends Document {
    imageUrl: string;             // Profile image URL or import
    badge: string;                // e.g., "Founder"
    fullName: string;             // "Ahmed Al-Rashid"
    role: string;                 // "Co-Founder & CEO"
    summary: string;              // Bio/description
    achievements: string[];       // List of key achievements
    socialLinks: {
        linkedIn?: string;
        email?: string;
        [key: string]: string | undefined; // For additional icons
    };
}

const FounderProfileSchema = new Schema<IFounderProfile>(
    {
        imageUrl: {
            type: String,
            required: true
        },
        badge: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false
        },
        summary: {
            type: String,
            required: false
        },
        achievements: {
            type: [String],
            required: false,
            default: []
        },
        socialLinks: {
            linkedIn: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: false
            }
        }
    },
    {
        timestamps: true
    }
);

export const FounderProfile = mongoose.model<IFounderProfile>("FounderProfile", FounderProfileSchema);
