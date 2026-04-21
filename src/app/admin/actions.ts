"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    console.error("ADMIN_USER or ADMIN_PASSWORD not set in environment.");
  }

  if (username === adminUser && password === adminPass) {
    console.log("Admin login: Success, setting session and redirecting...");
    // Set a session cookie
    cookies().set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    console.warn(`Admin login: Failed attempt for user "${username}"`);
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}
