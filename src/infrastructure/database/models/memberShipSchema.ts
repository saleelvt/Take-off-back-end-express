import mongoose, { Schema, Document, model } from 'mongoose';

// Interface for TypeScript type checking
export interface IMembership extends Document {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    linkedin: string;
  };
  
  businessInfo: {
    companyName: string;
    position: string;
    industry: string;
    companySize: string;
    businessType: string;
    primaryLocation: string;
    companyWebsite: string;
    companyDescription: string;
  };
  
  interests: {
    programInterests: string[];
    businessGoals: string;
    referralSource: string;
    volunteeringInterested: boolean;
    contributionIdeas: string;
  };
}

// Mongoose Schema
const MembershipSchema: Schema = new Schema(
  {
    personalInfo: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
      nationality: { type: String },
      linkedin: { type: String }
    },
    
    businessInfo: {
      companyName: { type: String },
      position: { type: String },
      industry: { type: String },
      companySize: { type: String },
      businessType: { type: String },
      primaryLocation: { type: String },
      companyWebsite: { type: String },
      companyDescription: { type: String }
    },
    
    interests: {
      programInterests: { type: [String] },
      businessGoals: { type: String },
      referralSource: { type: String },
      volunteeringInterested: { type: Boolean },
      contributionIdeas: { type: String }
    }
  },
  {
    timestamps: true
  }
);


export const Membership=model<IMembership>("Membership",MembershipSchema)