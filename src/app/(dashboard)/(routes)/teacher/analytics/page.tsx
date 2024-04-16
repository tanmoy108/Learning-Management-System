import getAnalytics from '@/actions/getAnalytics'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CardAnalytics from './_components/cardAnalytics'
import Cart from './_components/cart'
import { CircleDollarSign, CirclePercent } from 'lucide-react'


const AnalyticsPage =async () => {

  const {userId} = auth()
  
  if(!userId) return redirect("/")

    const { objectToArrayKeyValue,totalRevenue,totalSales} = await getAnalytics(userId);

  return (
    <div>
       <div className="flex xs:flex-col md:flex-row gap-5 mb-5">
        <CardAnalytics icon={CircleDollarSign} value={totalRevenue} label="Total Revenue" isFormat/>
        <CardAnalytics icon={CirclePercent} value={totalSales} label="Total Sale" />
      </div>
      <div>
        <Cart data={objectToArrayKeyValue}/>
      </div>
    </div>
  )
}

export default AnalyticsPage