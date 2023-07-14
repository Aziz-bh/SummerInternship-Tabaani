import WeeklyRevenue from "views/admin/MainDashboard/components/WeeklyRevenue";
import TotalSpent from "views/admin/MainDashboard/components/TotalSpent";

import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"users"}
          subtitle={"1000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Completed courses"}
          subtitle={"20"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
    </div>
  );
};

export default Dashboard;
