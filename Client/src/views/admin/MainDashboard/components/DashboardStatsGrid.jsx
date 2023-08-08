import React from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

export default function DashboardStatsGrid() {
  return (
    <div className="flex flex-col  md:flex-row gap-4">
      <BoxWrapper  >
        <BoxContent 
          icon={<IoBagHandle className="text-2xl text-white" />}
          label="Earnings"
          value="$54232"
          change="+343"
        />
      </BoxWrapper>
      <BoxWrapper>
        <BoxContent
          icon={<IoPieChart className="text-2xl text-white" />}
          label="Total Expenses"
          value="$3423"
          change="-343"
        />
      </BoxWrapper>
      <BoxWrapper>
        <BoxContent
          icon={<IoPeople className="text-2xl text-white" />}
          label="Users"
          value="12313"
          change="-30"
        />
      </BoxWrapper>
      <BoxWrapper>
        <BoxContent
          icon={<IoCart className="text-2xl text-white" />}
          label="Completed Courses"
          value="16432"
          change="-43"
        />
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-[20px] p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

function BoxContent({ icon, label, value, change }) {
  return (
    <>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-black">
        {icon}
      </div>
      <div className="pl-4">
        <span className="text-sm text-gray-500 font-light">{label}</span>
        <div className="flex items-center">
          <strong className="text-xl text-gray-700 font-semibold sm:text-2xl md:text-3xl">
            {value}
          </strong>
          <span className="text-sm text-green-500 pl-2">{change}</span>
        </div>
      </div>
    </>
  );
}
