import mongoose, { Schema, Document, model } from 'mongoose';

export interface IBusinessCard extends Document {
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  discount: string;
}

const BusinessCardSchema = new Schema<IBusinessCard>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  discount: { type: String, required: true }
});

export const VerifiedMembership = model<IBusinessCard>('VerifiedMembership', BusinessCardSchema);
