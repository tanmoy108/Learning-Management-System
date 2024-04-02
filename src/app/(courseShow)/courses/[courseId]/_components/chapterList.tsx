import { Chapter, UserProgress } from '@prisma/client'
import { Lock,CirclePlay, CircleCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface chapterListProps{
    id:string,
    title:string,
    isCompleted:boolean,
    isLocked:boolean
    courseId:string
}

function ChapterList({ 
    id,
    title,
    isCompleted,
    isLocked,
    courseId}:chapterListProps) {
  return (
   <div>
    <Link href={`/courses/${courseId}/chapters/${id}`}>
    <div className='flex items-center gap-x-3 bg-slate-200 py-4 pl-2'>
        {isLocked ? <Lock /> : (isCompleted ? <CircleCheck /> : <CirclePlay />)}
        <p>{title}</p>
    </div>
    </Link>
   </div>
  )
}

export default ChapterList