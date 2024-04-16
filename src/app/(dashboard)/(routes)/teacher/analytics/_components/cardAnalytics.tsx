import { FormatPrice } from "@/lib/formatPrice";
import Icon from "../../../(root)/_components/iconBadge";
import { CircleDollarSign, LucideIcon } from "lucide-react";

interface CardAnalyticsProps {
  value?: number | null;
  label: string;
  isFormat?: boolean;
  icon:LucideIcon
}

const CardAnalytics = ({ icon ,value, label, isFormat }: CardAnalyticsProps) => {
  return (
    <div>
      <div className="w-[363px] h-[77px] rounded-md bg-[#fff] flex items-center gap-x-2 pl-4">
        {/* <img src="/clock.png" /> */}
        <Icon label={label+" :"} icon={icon} variant="success"/> 
        <p className="text-[18px]">
          {isFormat ? FormatPrice(value || 0) : value || 0}
        </p>
      </div>
    </div>
  );
};

export default CardAnalytics;
