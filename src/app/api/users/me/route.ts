import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
connect()

export async function GET(req:NextRequest) {
    try{
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId}).select("-password");
        return NextResponse.json({
            message : "User found",
            data : user,
        });


    }
    catch(error : any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}