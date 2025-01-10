import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  createdAt: Date;
  expiresAt?: Date;
  clickCount: number;
  clicks: { timestamp: Date; ip: string }[];
}

const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  alias: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  clickCount: { type: Number, default: 0 },
  clicks: [{ timestamp: { type: Date, default: Date.now }, ip: String }],
});

export default mongoose.model<IUrl>("Url", UrlSchema);
