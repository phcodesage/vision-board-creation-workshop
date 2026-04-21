import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  name: string;
  phone: string;
  reference: string;
  screenshotUrl?: string;
  courseName: string;
  amount: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  reference: { type: String, required: true },
  screenshotUrl: { type: String },
  courseName: { type: String, required: true },
  amount: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
