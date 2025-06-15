import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "@/utils/db";

export async function POST(req) {
    const { token , newpassword } = await  req.json();
    
    //ตรวจสอบ token
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    if(!decoded){
        return null;
    }
    const email = decoded.email

    //hasspassword
    const hashpassword = await bcrypt.hash(newpassword , 10)

    try { 
        const resetPassword = await prisma.users.update({
            where:{
                email:email
            },
            data:{
                password:hashpassword
            }
        })

        return NextResponse.json({message : "Reset Password Success !"})        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message : " Sever Resetpassword Error ! "},{status:400})
    }
}