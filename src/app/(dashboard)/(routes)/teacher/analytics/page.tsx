import getAnalytics from '@/actions/getAnalytics'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CardAnalytics from './_components/cardAnalytics'
import Cart from './_components/cart'


const AnalyticsPage =async () => {

  const {userId} = auth()
  
  if(!userId) return redirect("/")

    const { objectToArrayKeyValue,totalRevenue,totalSales} = await getAnalytics(userId);

  return (
    <div>
      <div>
        <CardAnalytics value={totalRevenue} label="Total Revenue" isFormat/>
        <CardAnalytics value={totalSales} label="Total Sale" />
      </div>
      <div>
        <Cart data={objectToArrayKeyValue}/>
      </div>
    </div>
  )
}

export default AnalyticsPage