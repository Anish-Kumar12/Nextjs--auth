import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, oldPassword, newPassword } = reqBody;
        console.log("Request body:", reqBody);

        // Find the user with the reset token and check if the token is still valid
        const user = await User.findOne({
            forgotPasswordTokenExpiry: { $gt: Date.now() },
            forgotPasswordToken: { $exists: true }
        });

        if (!user) {
            console.error("User not found or token expired");
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        console.log("User found:", user);

        // Verify the token
        const isTokenValid = await bcryptjs.compare(token, user.forgotPasswordToken);
        if (!isTokenValid) {
            console.error("Invalid or expired token");
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Ensure oldPassword and user.password are defined
        if (!oldPassword || !user.password) {
            console.error("Old password or user password is undefined");
            console.log("Old password:", oldPassword)
            console.log("User password:", user.password)
            return NextResponse.json({ error: "Old password or user password is undefined" }, { status: 400 });
        }

        // Verify the old password
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            console.error("Old password is incorrect");
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update the user's password and remove the reset token and expiry
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
    } catch (error: any) {
        console.error("Error resetting password:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}