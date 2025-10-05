import mongoose, { Document, Schema } from "mongoose";

export interface IEventDetails extends Document {
    imageUrl: string;          // URL or local path to the event image
    dateLabel: string;         // e.g., "10 Oct"
    isRegular: boolean;        // true for "Regular"
    title: string;             // "New TakeOff Academy: Digital Marketing Mastery"
    type: string;              // e.g., "Workshop"
    description: string;       // Full event description
    eventDate: string;         // e.g., "Dec 15, 2024"
    eventTime: string;         // e.g., "6:00 PM - 9:00 PM"
    location: string;          // e.g., "Dubai International Financial Centre"
}

const EventDetailsSchema = new Schema<IEventDetails>(
    {
        imageUrl: {
            type: String,
            required: true
        },
        dateLabel: {
            type: String,
            required: true
        },
        isRegular: {
            type: Boolean,
            required: true,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        eventDate: {
            type: String,
            required: true
        },
        eventTime: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const EventDetails = mongoose.model<IEventDetails>("EventDetails", EventDetailsSchema);
