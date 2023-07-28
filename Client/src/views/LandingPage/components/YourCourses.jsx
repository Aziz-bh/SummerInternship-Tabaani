import React from "react";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";

const YourCourses = () => {
  const coursesData = [
    {
      id: 1,
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1531761535209-180857e963b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
      points: 100,
    },
    {
      id: 2,
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1494676051766-7a7454d53904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      pic: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",

      points: 80,
    },
    {
      id: 3,
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1494676051766-7a7454d53904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      pic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",

      points: 80,
    },
    {
      id: 4,
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1494676051766-7a7454d53904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      pic: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
      points: 80,
    },
  ];
  return (
    <div className="mx-auto bg-white py-10  md:px-11 lg:px-24" id="about">
      <div className="flex items-center justify-between pb-8 pr-2">
        <p className="text-left text-2xl font-bold text-[#000000]">
          YOUR COURSES
        </p>
        <button className="rounded-lg bg-gray-200 py-2 px-6">See All</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Unfinished courses slider */}
        {coursesData.map((course, index) => (
          <div key={index} className="pr-2">
            <UnfinishedCoursesCard
              key={index}
              title={course.title}
              image={course.image}
              pic={course.pic}
              points={course.points}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourCourses;
