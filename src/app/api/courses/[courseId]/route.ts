import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function  PATCH(req:Request,{params}:{params:{courseId:string}}){
    const {userId} = auth()
 try {
    if(!userId) return new NextResponse("unauthorized",{status:401})

    const values = await req.json()
    const findCourse = await db.course.update({
        where:{
            id:params.courseId,
            userId
        },
        data:{
            ...values
        }
    })
    return NextResponse.json({findCourse,success:true},{status:200})
 } catch (error) {
    console.log("api/courses/[courseId]",error)
    return new NextResponse("something error",{status:500})
 }
}