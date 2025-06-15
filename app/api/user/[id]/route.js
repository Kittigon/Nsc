import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcrypt"

//GET ID USER 
export async function GET(req, { params }) {
    const { id } = await params
    try {
        const showUser = await prisma.users.findMany({
            where: {
                id: parseInt(id)
            },
            select: {
                email: true,
                fname: true,
                lname: true
            }
        })

        return NextResponse.json(showUser)
    } catch (error) {
        return NextResponse.json({ message: "Sever read Error !" }, { status: 400 })
    }
}

//put [change , email | fname | lname ]
export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();
    const { email, fname, lname } = body
    try {
        const updated = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: email,
                fname: fname,
                lname: lname
            }
        })

        return NextResponse.json({ message: "Update Data Success !" })

    } catch (error) {
        return NextResponse.json({ message: " Sever update error !" }, { status: 400 })
    }
}

//patch [change password]
export async function PATCH(req, { params }) {
    const { id } = await params
    const body = await req.json()
    const { password } = body;
    try {
        //hashpassword
        const hashpassword = await bcrypt.hash(password, 10)

        const chagePassword = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                password: hashpassword
            }
        })

        return NextResponse.json({ message: "Change Password Success !" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever Update Password Error !" }, { status: 400 })
    }
}

//delete user
export async function DELETE(req, { params }) {
    const { id } = await params
    try {
        const remove = await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        })
        return NextResponse.json({ message: " Delete User Success !" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever delete user Error!" }, { status: 400 })
    }
}