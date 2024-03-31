
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
    <div>CourseListItem</div>
  )
}

export default CourseListItem