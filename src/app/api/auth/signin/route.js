import { supabase } from '../../../../../lib/supabaseClient';
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if the email exists in the database
    const { data: user, error } = await supabase
      .from('authadmin') // Table name
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return NextResponse.json(
        { message: 'Email does not exist', status: 401 },
        { status: 401 }
      );
    }

    // Verify password
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Incorrect password', status: 401 },
        { status: 401 }
      );
    }

    // Check if JWT secret is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, fullName: user.full_name },
      jwtSecret,
      { expiresIn: '7d' } // 7 days token expiry
    );

    // Return successful login response
    return NextResponse.json(
      {
        message: 'User Login successfully',
        status: 200,
        data: {
          token, // Token for authentication
          email: user.email,
          user_id: user.id,
          full_name: user.full_name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
