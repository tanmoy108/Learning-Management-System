import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{courseId:string}}){
    try {
        
        const {userId} = auth()
        const {url} = await req.json()
        if(!userId) return new NextResponse("Unauthorized", {status:401})

        const findCourse = await db.course.findUnique(
            {where:{
                id:params.courseId,
                userId:userId
            }}
        )

        if(!findCourse) return new NextResponse("Can not find", {status:401})

        const newAttachment = await db.attachment.create({
            data:{
                url,
                courseId:params.courseId,
                name:url.split("/").pop()
            }
        }) 

        return NextResponse.json({...newAttachment,success:true},{status:201})


    } catch (error) {
        console.log("api/[courseId]/attachments",error)
        return new NextResponse("Internal Server",{status:500})
    }
}