"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    // Set a session cookie
    cookies().set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    // We don't use redirect() here if we want to return the error to the client
    // but redirect() is allowed in server actions.
    // However, if we want to return an error, we should return it before redirecting.
    redirect('/admin/dashboard');
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}
