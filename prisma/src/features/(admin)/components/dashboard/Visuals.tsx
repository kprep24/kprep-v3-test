import React from 'react'
import { YearWiseUsers } from './RegestrationCharts'
import YearRegAndPremiumCharts from './YearRegAndPremiumCharts'
import { useYearWiseRestration } from '../../hooks/useYearWiseRegestration'
import { useYearWisePremimum } from '../../hooks/useYearWisePremimum'

function Visuals({ dashboardData }: { dashboardData: any }) {


  const { charts } = useYearWiseRestration();
  const { charts: premimumUsers } = useYearWisePremimum();


  return (
    <div>
      <div className="pie_charts flex justify-around">
        <div className="w-5/12 ">
          <YearWiseUsers charts={charts} title={'Year-wise Registration'} description={'Showing total registration for this semester'} />
        </div>
        <div className="w-5/12 ">
          <YearWiseUsers charts={premimumUsers} title={'Year-wise Subscription Taken'} description={'Showing total subscriptions for this semester'} />
        </div>
      </div>

      {/* <div className="line_charts flex justify-around">
        <div className='w-5/12 mt-4'>
          <YearRegAndPremiumCharts />
        </div>
        <div className='w-5/12 mt-4'>
          <YearRegAndPremiumCharts />
        </div>
      </div> */}
    </div>
  )
}

export default Visuals
