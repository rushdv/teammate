import mongoose, { Schema, Document } from 'mongoose';

export interface IUnassigned extends Document {
  name: string;
  createdAt: Date;
}

const UnassignedSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Unassigned || mongoose.model<IUnassigned>('Unassigned', UnassignedSchema);
