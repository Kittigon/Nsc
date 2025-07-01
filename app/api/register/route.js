import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fname: z.string().min(1, 'First name is required'),
  lname: z.string().min(1, 'Last name is required')
});

//register
export async function POST(req) {
    try {
        const body = await req.json();
        
        // Validate input
        const validatedData = registerSchema.parse(body);
        
        // Check if user exists
        const existingUser = await prisma.users.findUnique({
            where: {
                email: validatedData.email
            }
        });

        if (existingUser) {
            return NextResponse.json({ 
                message: "User with this email already exists",
                error: "EMAIL_EXISTS"
            }, { status: 400 });
        }

        // Validate password strength
        if (!/[A-Z]/.test(validatedData.password)) {
            return NextResponse.json({ 
                message: "Password must contain at least one uppercase letter",
                error: "WEAK_PASSWORD"
            }, { status: 400 });
        }
        if (!/[a-z]/.test(validatedData.password)) {
            return NextResponse.json({ 
                message: "Password must contain at least one lowercase letter",
                error: "WEAK_PASSWORD"
            }, { status: 400 });
        }
        if (!/[0-9]/.test(validatedData.password)) {
            return NextResponse.json({ 
                message: "Password must contain at least one number",
                error: "WEAK_PASSWORD"
            }, { status: 400 });
        }

        // Hash password with increased salt rounds for better security
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Create user
        const user = await prisma.users.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                fname: validatedData.fname,
                lname: validatedData.lname,
                role: "USER"
            },
            select: {
                id: true,
                email: true,
                fname: true,
                lname: true,
                createdAt: true
            }
        });

        return NextResponse.json({
            message: "Registration successful",
            user: {
                id: user.id,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                createdAt: user.createdAt
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: "Validation error",
                errors: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}



