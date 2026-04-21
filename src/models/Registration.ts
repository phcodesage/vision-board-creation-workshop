import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  name: string;
  phone: string;
  reference: string;
  courseName: string;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  reference: { type: String, required: true },
  courseName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);
