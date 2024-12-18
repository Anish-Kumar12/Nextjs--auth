import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json(
        { msg: "Please enter all fields" },
        { status: 400 }
      );
    }
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: "User does not exists" }, { status: 400 });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
    }
    const tokendata = {
        id: user.id,
        name: user.name,
        email: user.email,
    }
    // Generate token
    const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
        message : "Login successful",
        success : true,
    })
    response.cookies.set("token", token, {
        httpOnly: true,
    })
    return response;

  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}