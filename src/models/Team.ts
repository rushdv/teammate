import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
  name: string;
  studentId: string;
}

export interface ITeam extends Document {
  teamName: string;
  members: IMember[];
  createdAt: Date;
}

const MemberSchema = new Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
}, { _id: false });

const TeamSchema: Schema = new Schema({
  teamName: { type: String, required: true },
  members: { type: [MemberSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

// In development, this ensures the model is updated when the schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Team;
}

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
