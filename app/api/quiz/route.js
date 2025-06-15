import prisma from "@/utils/db";
import { NextResponse } from "next/server";

//สร้างชื่อแบบทดสอบ
export async function POST() {
    try {
        await prisma.quiz.createMany({
            data: [
                { name: "แบบประเมิน Dash-21 ", numofItem: 21 },
                { name: "แบบประเมิน 9Q ", numofItem: 9 }
            ],
            skipDuplicates: true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message : "Sever Error "},{status:400})
    }
}