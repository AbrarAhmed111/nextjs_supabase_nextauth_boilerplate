import { supabase } from '../../../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse request body
    const { full_name, email, password } = await req.json();

    // Validate the input fields
    if (!email) {
      return NextResponse.json({ message: "Email is required!" }, { status: 400 });
    }
    if (!full_name) {
      return NextResponse.json({ message: "Full name is required!" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ message: "Password is required!" }, { status: 400 });
    }

    // Check if the user already exists by email
    const { data: existingUser, error: fetchError } = await supabase
      .from('authadmin') // Table name for users
      .select('email')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // Handle unexpected errors during fetch
      throw new Error(fetchError.message);
    }

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists!" }, { status: 400 });
    }

    // Insert the new user into the 'authadmin' table (no hashing needed here)
    const { data, error: insertError } = await supabase
      .from('authadmin') // Correct table for storing users
      .insert([{ email, full_name, password }]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    // Success response
    return NextResponse.json({ message: "User Created Successfully", status: 200 });

  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
