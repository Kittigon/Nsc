import { NextResponse } from "next/server";
import nodemailerr from 'nodemailer'
import jwt from 'jsonwebtoken'
import prisma from "@/utils/db";

export async function POST(req) {
    const { email } = await req.json();
    try {

        //หาemail ใน database 
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'ไม่พบผู้ใช้ในระบบ' }, { status: 404 })
        }

        //สร้าง token  / 5 นาที
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '2m' })

        // link สำหรับรีเซ็ตรหัสผ่าน
        const resetlink = `http://localhost:3000/resetpassword/resetpage?token=${token}`

        const transporter = nodemailerr.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `รีเซ็ตรหัสผ่านของคุณ`,
            text: `
            
            คลิ๊กที่ ลิงค์เพื่อไปยังหน้ารีเซ็ตรหัสผ่าน : ${resetlink}
            
            `
        })

        return NextResponse.json({ message: `email :Send To email : ${email} Sucess !` })
    } catch (error) {
        return NextResponse.json({ message: "Sever sendEmail Error !", error }, { status: 400 })
    }
}