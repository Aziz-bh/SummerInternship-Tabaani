
import Card from "components/card";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { MdCheckCircle, MdCancel } from "react-icons/md";
import Progress from "components/progress";
const ComplexTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Replace USER_ID with the actual user ID
        const responseData = response.data;
        console.log(responseData.usersWithCourses);
        // Check if the response has usersWithCourses array
        if (Array.isArray(responseData.usersWithCourses)) {
          const formattedData = responseData.usersWithCourses.map(user => ({
            picture: user.userData.ProfilePic,
            name: user.userData.firstname, // Replace with the actual user property
            status: user.userData.verified ? "Verified" : "Unverified",
            country: user.userData.country,
            courses: user.subscribedCourses.map(course => course.title),
            progress: user.subscriptions.map(subscription => subscription.progress),
            // Replace with the actual progress property
          }));
          console.log("hh" + formattedData)
          setTableData(formattedData);
        } else {
          console.error('Invalid API response:', responseData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'picture', // Replace with the correct accessor for progress
      },
      {
        Header: 'NAME',
        accessor: 'name',
      },
      {
        Header: 'STATUS',
        accessor: 'status',
      },
      {
        Header: 'COUNTRY',
        accessor: 'country', // Replace with the correct accessor for date
      },
      {
        Header: 'COURSES',
        accessor: 'courses', // Replace with the correct accessor for date
      },
      {
        Header: 'PROGRESS',
        accessor: 'progress', // Replace with the correct accessor for progress
      },

    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  initialState.pageSize = 5;

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold  dark:text-white">Users Progress</div>

      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    console.log("hello" + cell.value);
                    if (cell.column.Header === "") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className=" h-[60px] w-[60px]  rounded-full border-[4px] border-white bg-orange-400 dark:!border-navy-700">
                            <img
                              className="h-full w-full rounded-full"
                              src={cell.value}

                            />

                          </div>
                        </div>
                      );
                    }
                    else if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );

                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Verified" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Unverified" ? (
                              <MdCancel className="text-orange-400" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "COUNTRY") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "COURSES") {
                      data = (
                        <div className="flex flex-col">
                          {cell.value.map((course, index) => (
                            <div key={index} className="flex items-center gap-2 ">
                              <p className="font-bold">{course}</p>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <div className="flex flex-col">
                          {cell.value.map((progress, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Progress width="w-48" value={progress} />
                              <p className="font-bold">{progress}%</p>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
