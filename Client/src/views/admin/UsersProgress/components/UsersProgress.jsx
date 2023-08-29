import Card from "components/card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel,MdClose } from "react-icons/md";
import Progress from "components/progress";
const ComplexTable = () => {
  const [tableData, setTableData] = useState([]);
  const [showCoursesModal, setShowCoursesModal] = useState(false);


  const openCoursesModal = () => {
    setShowCoursesModal(true);
  };

  const closeCoursesModal = () => {
    setShowCoursesModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Replace USER_ID with the actual user ID
        const responseData = response.data;
        console.log(responseData.usersWithCourses);
        // Check if the response has usersWithCourses array
        if (Array.isArray(responseData.usersWithCourses)) {
          const formattedData = responseData.usersWithCourses.map((user) => ({
            picture: user.userData.photoURL,
            name: user.userData.displayName, // Replace with the actual user property
            status: user.userData.verified ? "Verified" : "Unverified",
            country: user.userData.country,
            courses: user.subscribedCourses.map((course) => course.title),
            progress: user.subscriptions.map(
              (subscription) => subscription.progress
            ),
            // Replace with the actual progress property
          }));
          console.log("hh" + formattedData);
          setTableData(formattedData);
        } else {
          console.error("Invalid API response:", responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const Modal = ({ children, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
          <button   className="absolute top-50 right-5 p-1 h-6 w-6 text-gray-600" onClick={onClose}> <MdClose size={24} /></button>
        </div>
      </div>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "picture", // Replace with the correct accessor for progress
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "COUNTRY",
        accessor: "country", // Replace with the correct accessor for date
      },
      {
        Header: "COURSES WITH PROGRESS" ,
        accessor: "courses    ", // Replace with the correct accessor for date
      },
      //  {
      //    Header: "PROGRESS",
      //   accessor: "progress", // Replace with the correct accessor for progress
      //  },
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
                    className="border-b border-gray-200 pb-[10px] pr-28 text-start dark:!border-navy-700"
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
                    } else if (cell.column.Header === "NAME") {
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
                    } else if (cell.column.Header === "COURSES WITH PROGRESS") {
                      data = (
                        <div className="flex flex-col">
                          {/* <button onClick={openCoursesModal}>Courses</button> */}
                          <button className="rounded-lg bg-gray-200 px-5 py-2 w-[150px]" onClick={openCoursesModal}>See All</button>
                          
                          {showCoursesModal && (
                            <Modal onClose={closeCoursesModal}>
                              
                             
                              <ul>
                                {tableData.map((user, index) => (
                                  <li key={index}>

                                    {/* Display the list of courses and progressions for this user */}
                                    <div className="flex flex-col">
                                      {user.courses.map((course, courseIndex) => (
                                        <div key={courseIndex} className="flex items-center gap-2">
                                          <p className="font-bold">{course}</p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex flex-col">
                                      {user.progress.map((progress, progressIndex) => (
                                        <div key={progressIndex} className="flex items-center gap-2">
                                          <Progress width="w-48" value={progress} />
                                          <p className="font-bold">{progress}%</p>
                                        </div>
                                      ))}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </Modal>
                          )}
                        </div>
                      );
                    } 
                    // else if (cell.column.Header === "PROGRESS") {
                    //   data = (
                    //     <div className="flex flex-col">
                    //       {cell.value.map((progress, index) => (
                    //         <div
                    //           key={index}
                    //           className="flex items-center gap-2"
                    //         >
                    //           <Progress width="w-48" value={progress} />
                    //           <p className="font-bold">{progress}%</p>
                    //         </div>
                    //       ))}
                    //     </div>
                    //   );
                    // }
                    return (
                      <td
                        className="pb-[18px] pt-[14px] sm:text-[14px]"
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
