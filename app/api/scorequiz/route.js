import { NextResponse } from "next/server";
import prisma from "@/utils/db";

// หาคะแนนและความเสี่ยงของแบบประเมิน dash-21 กับ 9Q
export async function GET() {
    try {

        const score9qList = await prisma.scorequiz.findMany({
            where:{
                score9q:{
                    not:null
                },
            },
            include:{
                user:{
                    select:{
                        id: true,
                        email: true,
                        fname: true,
                        lname: true
                    }
                },
                quiz:{
                    select:{
                        name:true
                    }
                }
            },
        });

        const scoreDash21List = await prisma.scorequiz.findMany({
            where:{
                AND:[
                    {scoredepression:{not:null}},
                    {scoreanxious : {not:null}},
                    {scorestressed:{not:null}}
                ],
            },
            include:{
                user:{
                    select:{
                        id: true,
                        email: true,
                        fname: true,
                        lname: true
                    }
                },
                quiz:{
                    select:{
                        name:true
                    }
                }
            },
        });


        return NextResponse.json({ score9qList , scoreDash21List})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever Error !" }, { status: 400 })
    }
}


// สร้างบันทึกคะแนนแบบทดสอบ 
export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, quizId 
            , score9q, level9q
            , scoredepression, scoreanxious, scorestressed 
            , leveldepression , levelanxious , levelstressed   } = body;
        await prisma.scorequiz.create({
            data: {
                userId: parseInt(userId),
                quizId: parseInt(quizId),
                score9q: score9q,
                level9q: level9q,
                scoredepression: scoredepression,
                scoreanxious: scoreanxious,
                scorestressed: scorestressed,
                leveldepression:leveldepression,
                levelanxious : levelanxious ,
                levelstressed : levelstressed
            }
        })
        return NextResponse.json({ message: "Create ScoreQuiz success ! " }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Sever Error ! " }, { status: 400 })
    }
}