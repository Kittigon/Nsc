import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

//register
export async function POST(req) {
    try {
        const { email , password , fname , lname  } = await req.json();
        const checkuser = await prisma.users.findUnique({
            where:{
                email:email
        }
        })

        if(checkuser){
            return NextResponse.json({ message : "Register failed"},{status:400})
        }

        //hashpassword
        const hashpassword = await bcrypt.hash(password , 10)

        //register
        await prisma.users.create({
            data:{
                email:email,
                password:hashpassword,
                fname:fname,
                lname:lname
            }
        })

        return NextResponse.json({message : "Register success !"} , {status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({messsage : "Sever Error ! "} , {status:400})
    }
}



