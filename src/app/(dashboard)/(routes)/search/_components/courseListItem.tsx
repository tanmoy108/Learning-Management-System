import { CourseProgress } from "@/components/courseProgress";
import { FormatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface courseListItemProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  progress: number | null;
  category: string;
  chapterLength: number;
}
const CourseListItem = ({
  id,
  title,
  price,
  imageUrl,
  progress,
  category,
  chapterLength,
}: courseListItemProps) => {
  return (
    <div>
      <Link href={`/courses/${id}`}>
        <div className="w-[270px] md:w-[240px] lg:w-[230px] xl:w-[280px] rounded-lg overflow-hidden bg-[#FFFFFF]">
          <div className="h-[130px] relative">
            <Image
              src={imageUrl}
              alt={title}
              width={270}
              height={130}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between p-2">
            <div className="bg-[#FAEDC6] flex items-center px-2 gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 4 4"
                fill="none"
              >
                <circle cx="2" cy="2" r="2" fill="#FBBC02" />
              </svg>
              <div className="text-[12px] lg:text-[10px] xl:text-[12px] text-[#545454] font-medium tracking-[-0.12px]">
                {category}
              </div>
            </div>
            <div className="flex items-center px-2 gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1.33333 2H5.33333C6.04057 2 6.71885 2.28095 7.21895 2.78105C7.71904 3.28115 7.99999 3.95942 7.99999 4.66667V14C7.99999 13.4696 7.78928 12.9609 7.41421 12.5858C7.03914 12.2107 6.53043 12 5.99999 12H1.33333V2Z"
                  stroke="#3E8E7E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6667 2H10.6667C9.95942 2 9.28115 2.28095 8.78105 2.78105C8.28095 3.28115 8 3.95942 8 4.66667V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14.6667V2Z"
                  stroke="#3E8E7E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#3E8E7E] text-[12px] font-normal">
              {chapterLength} {chapterLength == 1 ? "lesson" : "lessons"}
              </div>
            </div>
          </div>
          <div className=" p-2 text-[#191919] text-[16px] capitalize font-semibold tracking-[-0.16px]">{title}</div>
          <div className={cn("text-right p-2 text-[#191919] text-[12px] tracking-[-0.12px] font-bold",progress!==null && "text-left")}>
            {progress !== null ? (
              <CourseProgress value={progress} />
            ) : (
              FormatPrice(price)
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseListItem;
