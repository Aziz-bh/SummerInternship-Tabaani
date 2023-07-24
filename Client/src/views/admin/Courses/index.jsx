import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";
import CourseCard from "components/card/CourseCard";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";

const Courses = () => {
  const coursesData = [
    {
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1531761535209-180857e963b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      pic: avatar1,
      points: 100,
    },
    {
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1494676051766-7a7454d53904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      pic: avatar2,
      points: 80,
    },
    {
      title: "Course – Introduction to Hosting",
      image:
        "https://images.unsplash.com/photo-1494676051766-7a7454d53904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      pic: avatar2,
      points: 80,
    },
    // Add more courses as needed
  ];

  const nextCoursesData = [
    {
      title: "Course – Introduction to Hosting Essential Training",
      author: "Esthera Jackson",
      price: "0.91",
      image:
        "  https://plus.unsplash.com/premium_photo-1661369931884-0706c99d88b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1212&q=80",
    },
    {
      title: "Course – Introduction to Hosting Essential Training",
      author: "Nick Wilson",
      price: "0.7",
      image:
        "https://plus.unsplash.com/premium_photo-1661369931884-0706c99d88b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1212&q=80",
    },
    {
      title: "Course – Introduction to Hosting Essential Training",
      author: "Will Smith",
      price: "2.91",
      image:
        "https://plus.unsplash.com/premium_photo-1661369931884-0706c99d88b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1212&q=80",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-2 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold dark:text-white">
            Your unfinished courses
          </h4>
        </div>
        <div className="z-20">
          {/* Unfinished courses slider */}
          <Slider {...sliderSettings}>
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
          </Slider>
        </div>
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold  dark:text-white">
            Your Next courses
          </h4>
        </div>

        {/* Next courses grid */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {nextCoursesData.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              author={course.author}
              price={course.price}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
