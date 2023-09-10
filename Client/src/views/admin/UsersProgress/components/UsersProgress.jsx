import Card from "components/card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdClose } from "react-icons/md";
import Progress from "components/progress";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdPlace } from 'react-icons/md';

const ComplexTable = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Nouvel état

  const handleOpen = (user) => {
    setOpen(!open);
    setSelectedUser(user); // Met à jour l'utilisateur actuel
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Replace USER_ID with the actual user ID
        const responseData = response.data;
        console.log(responseData.usersWithCourses);
        // Check if the response has usersWithCourses array
        if (Array.isArray(responseData.usersWithCourses)) {
          const formattedData = responseData.usersWithCourses.map((user) => {
            const firstSubscription = user.subscriptions[0]; // Get the first subscription
            return {
              picture: user.userData.photoURL,
              name: user.userData.displayName,
              status: user.userData.verified ? "Verified" : "Unverified",
              country: firstSubscription ? firstSubscription.country : "N/A",
              courses: user.subscribedCourses.map((course) => course.title),
              progress: user.subscriptions.map((subscription) => subscription.progress),
            };
          });
          console.log("Formatted data:", formattedData);
          setTableData(formattedData);
        }
        else {
          console.error("Invalid API response:", responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "picture", 
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
        accessor: "country", 
      },
      {
        Header: "COURSES ",
        accessor: "courses    ", 
      },
      {
        Header: "PROGRESS",
        accessor: "progress",
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
                        <div className="flex items-center gap-2">
      <MdPlace className="text-orange-400 text-xl" />
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {cell.value}
      </p>
    </div>
                      );
                    } else if (cell.column.Header === "COURSES ") {
                      data = (
                        <div>
                          <p className="font-bold">{row.original.courses[0]}</p>
                        </div>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <div className="flex flex-col">
                          <td>
                            <div className="flex items-center gap-2">
                              <Progress width="w-40" value={row.original.progress[0]} />
                              <p className="font-bold">{row.original.progress[0]}%</p>
                              <button
                                className="rounded-lg bg-gray-200 px-3 py-1 text-xs"
                                onClick={() => handleOpen(row.original)}
                              >
                                See All
                              </button>
                            </div>
                          </td>
                        </div>
                      );
                    }
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
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        animate={{
          mount: { scale: 1, y: 100 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="position-absolute left-[30rem] h-[30rem] w-[50rem] dialog-style"
      >
        <DialogHeader className="text-s">Courses with progress</DialogHeader>
        {selectedUser && (
          <DialogBody divider>
            <table>
              <thead>
                <tr>
                  <th>
                    <p className="text-s tracking-wide text-gray-600">Courses</p>
                  </th>
                  <th>
                    <p className="text-s tracking-wide text-gray-600">Progress</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "30px" }}>
                    <ul>
                      {selectedUser.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="flex items-center gap-2">
                          <p className="font-bold">{course}</p>
                        </div>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: "30px" }}>
                    <ul>
                      {selectedUser.progress.map((progress, progressIndex) => (
                        <li key={progressIndex} className="flex items-center gap-2">
                          <Progress width="w-40" value={progress} />
                          <p className="font-bold">{progress}%</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </DialogBody>
        )}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default ComplexTable;
