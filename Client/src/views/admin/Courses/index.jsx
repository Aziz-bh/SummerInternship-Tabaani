import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import CourseCard from "components/card/CourseCard";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";

const Courses = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-2 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 mt-5 flex flex-col justify-between  md:flex-row md:items-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Your unfinished courses
          </h4>
        </div>
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <UnfinishedCoursesCard />
        </div>
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Your Next courses
          </h4>
        </div>

        {/* Course card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <CourseCard
            title="How to create an authentic experience"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <CourseCard
            title="How to create an experience programming"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <CourseCard
            title="How to create food experience"
            author="Will Smith"
            price="2.91"
            image={NFt4}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
