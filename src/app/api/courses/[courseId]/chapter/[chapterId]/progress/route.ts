import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function PUT(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try {
        const {userId} = auth();
        const {isComplete} = await req.json()
        if(!userId){
            return NextResponse.json({result:"not authenticated",success:false},{status:400})
        }

        const userProgress = await db.userProgress.upsert({
            where:{
               userId_chapterId:{
                userId,
                chapterId:params.chapterId
               }
            },
            update:{
                isCompleted:isComplete
            },
            create:{
                userId,
                chapterId:params.chapterId,
                isCompleted:isComplete
            }
        })
        return NextResponse.json({result:userProgress,success:true},{status:200})

    } catch (error) {
        console.log("api/courses/[courseId]/chapter/[chapterId]",error) 
        return NextResponse.json({result:"server error",success:false},{status:500})
    }
}