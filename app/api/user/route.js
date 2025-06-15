import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET() {
    try {
        const showuser = await prisma.users.findMany({
            select:{
                id:true,
                email:true,
                fname:true,
                lname:true,
                role:true,
                updatedAt:true
            }
    })
    
        return NextResponse.json({showuser})
    } catch (error) {
        return NextResponse.json({message : " Sever read Error !"},{status:400})
    }
}