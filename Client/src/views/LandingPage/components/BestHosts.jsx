import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Guests = [
  {
    id: 1,
    author: "Ali Hssan",
    role: "history expert",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 2,
    author: "Debbie LaChusa",
    role: "SEO",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    author: "Edwin Diaz",
    role: "photography",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 4,
    author: "Cassie Evans",
    role: "food expert",
    image:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1195&q=80",
  },
  {
    id: 5,
    author: "Erich Andreas",
    role: "tour programmer",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 6,
    author: "Jason Allen",
    role: "tour manager",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
];

const BestHosts = () => {
  const [currPage, setCurrPage] = useState(0);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(Guests.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrPage((prevPage) => (prevPage + 1) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(goToNextPage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black w-full bg-white py-10 text-white md:px-11 lg:px-24">
      <div className="grid items-center gap-8 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-12 lg:grid-cols-12">
        {/*4 grid columns on lg and md screens */}
        <div className="bordersm:hidden hidden overflow-hidden rounded-md md:col-span-4 lg:col-span-4 lg:block">
          <div className="flex h-72 flex-col gap-5 rounded-md p-4">
            <h1 className="text-left text-3xl font-bold text-[#000000]">
              Best Hosts
            </h1>
            <p className="text-[#000000]">
              At the Academy, we strive to make together the best courses for
              the best experiences
            </p>
            <button className=" mt-12 flex h-12 w-36 items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-4 pr-2 text-center text-sm font-medium capitalize leading-tight text-white">
              Start Course
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
        {/* 8 grid columns on lg and md screens */}
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-8">
          <div className="mx-11 grid gap-8 pb-16 sm:mx-8 sm:grid-cols-2 md:mx-0 md:grid-cols-2 lg:mx-0 lg:grid-cols-3">
            {Guests.slice(
              currPage * itemsPerPage,
              (currPage + 1) * itemsPerPage
            ).map(({ id, author, image, role }) => (
              <div className="h-full w-full" key={id}>
                <div className="relative w-full">
                  <img
                    src={image}
                    className="mb-3 h-48 w-full rounded-xl object-cover 3xl:h-full 3xl:w-full"
                    alt=""
                  />
                </div>

                <div className="p-![18px] mb-6 flex items-center justify-between">
                  <p className="text-lg font-bold text-[#000000]">{author}</p>
                  <p className="font-light text-[#000000]">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestHosts;
