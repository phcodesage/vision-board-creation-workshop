import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, phone, reference, courseName } = body;

    // Save to MongoDB
    const newRegistration = await Registration.create({
      name,
      phone,
      reference,
      courseName,
      createdAt: new Date()
    });

    console.log('New MongoDB Registration stored:', newRegistration);

    return NextResponse.json({ 
      success: true, 
      registrationId: newRegistration._id 
    }, { status: 201 });

  } catch (error) {
    console.error('MongoDB Registration error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to record registration' 
    }, { status: 500 });
  }
}
