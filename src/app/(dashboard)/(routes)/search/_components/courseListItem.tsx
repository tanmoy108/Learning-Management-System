import { CourseProgress } from "@/components/courseProgress"
import { FormatPrice } from "@/lib/formatPrice"
import Image from "next/image"
import Link from "next/link"

interface courseListItemProps{
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    progress:number|null,
    category:string,
    chapterLength:number
}
const CourseListItem = ({id,title,price,imageUrl,progress,category,chapterLength}:courseListItemProps) => {
  return (
    <div>
      <Link href={`/courses/${id}`}>
      <div className="w-60 h-10">
        <Image src={imageUrl} alt={title} width={500} height={260} className="" />
        <div>{title}</div>
        <div>{chapterLength} {chapterLength==1 ? "chapter" :"chapters"}</div>
        <div>
          {progress !== null ? <CourseProgress variant="success" value={progress} /> :FormatPrice(price)}
        </div>

      </div>
      
      </Link>
    </div>
  )
}

export default CourseListItem