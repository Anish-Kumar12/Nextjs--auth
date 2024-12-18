import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try{
        const reponse = NextResponse.json({
            message : "Logout successful",
            success : true,
        })
        reponse.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        return reponse;
    }
    catch(error: any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}