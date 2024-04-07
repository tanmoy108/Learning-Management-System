import { FormatPrice } from "@/lib/formatPrice"

interface CardAnalyticsProps{
    value?:number|null,
    label:string,
    isFormat?:boolean
}

const CardAnalytics = ({value,label,isFormat}:CardAnalyticsProps) => {

  return (
    <div>
        <div>{label}</div>
        <div>{isFormat ? FormatPrice(value || 0) : (value || 0)}</div>
    </div>
  )
}

export default CardAnalytics