import {connect} from '@/dbconfig/dbconfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import { error } from 'console';

connect();

export async function POST(request : NextRequest){
    try{
        const reqbody = await request.json();
        const {token} = reqbody;
        console.log(token);

        const user = await User.findOne({verifyToken:token,verifyTokenExpire:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        await user.save();

        return NextResponse.json({message:"Email verified successfully"},{status:200});
    }   
    catch(e:any){
        return NextResponse.json({message:e.message},{status:500});
    }
}
