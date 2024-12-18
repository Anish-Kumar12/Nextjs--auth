import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { msg: "Please enter all fields" },
        { status: 400 }
      );
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });
    const savedUser = await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    
    return NextResponse.json(
      { msg: "User saved successfully", user: savedUser },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}