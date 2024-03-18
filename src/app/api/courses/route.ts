import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import {db} from "@/lib/db"


export async function POST(req:Request){
    try {
        const {title} = await req.json()
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const createCourse = await db.course.create({data:{title,userId}})

        return  NextResponse.json(createCourse)
    } catch (error) {
        console.log(`[api/courses]`,error)
        return new NextResponse("Internal Error",{status:500})
    }
}