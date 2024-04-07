import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"

interface IconProps{
    icon:LucideIcon,
    value?:number | null,
    label:string
    variant:"default" | "success"

}

const Icon = ({icon,value,label,variant}:IconProps) => {
    
  return (
    <div>
        
    <div className="flex items-center">
        <IconBadge icon={icon} variant={variant} />
        <div>{label}</div>
    </div>
    <div>{value}</div>
    </div>
  )
}

export default Icon