import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, phone, reference, screenshotUrl, courseName, amount } = body;

    const newPayment = await Payment.create({
      name,
      phone,
      reference,
      screenshotUrl,
      courseName,
      amount,
      status: 'pending'
    });

    console.log('New MongoDB Payment stored:', newPayment);

    return NextResponse.json({ 
      success: true, 
      paymentId: newPayment._id 
    }, { status: 201 });

  } catch (error) {
    console.error('MongoDB Payment error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to record payment' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const payments = await Payment.find({}).sort({ createdAt: -1 });
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
