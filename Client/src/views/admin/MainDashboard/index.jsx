import React from 'react'
import DashboardStatsGrid from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/views/admin/MainDashboard/components/DashboardStatsGrid.jsx'
import TransactionChart from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/views/admin/MainDashboard/components/TransactionChart.jsx'

import BuyerProfilePieChart from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/views/admin/MainDashboard/components//BuyerProfilePieChart'
import WeeklyRevenue from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/views/admin/MainDashboard/components//total spent'
import BuyerProfilePieChart2 from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/views/admin/MainDashboard/components//BuyerProfilePieChart copy'


export default function Dashboard() {
	return (
		<div > 
		<div>
			<DashboardStatsGrid />
		</div>
			
		<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      <TransactionChart />
	  <BuyerProfilePieChart />
      <BuyerProfilePieChart2 />
	<WeeklyRevenue/>
  </div>
		</div>
	)
}