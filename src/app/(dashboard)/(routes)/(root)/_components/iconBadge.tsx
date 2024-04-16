import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"

interface IconProps{
    icon:LucideIcon,
    label:string
    variant:"default" | "success"

}

const Icon = ({icon,label,variant}:IconProps) => {
    
  return (
    <div className="flex items-center">
        <IconBadge icon={icon} variant={variant} />
        <div className="pl-2">{label}</div>
    </div>
   
  )
}

export default Icon