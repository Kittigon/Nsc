import prisma from "@/utils/db"
import { NextResponse } from "next/server"


// หา 1 คน
export async function GET(req, { params }) {
    const { id } = await params
    try {
        const showUser = await prisma.scorequiz.findMany({
            where: {
                id: parseInt(id)
            },
            include: {
                user: true,
                quiz: true
            }
        })

        return NextResponse.json({ showUser })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever Error !" }, { status: 400 })
    }
}

// ลบผลคะแนน
export async function DELETE(req, { params }) {
    const { id } = await params
    try {
        const remove = await prisma.scorequiz.delete({
            where: {
                id: parseInt(id)
            }
        })
        return NextResponse.json({ message: " Delete Scorequiz Success !" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever delete Scorequiz Error!" }, { status: 400 })
    }
}