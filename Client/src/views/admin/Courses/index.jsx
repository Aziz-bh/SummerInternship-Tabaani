import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import CourseCard from "components/card/CourseCard";

const Courses = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <Banner />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Recently Added
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-orange-400 hover:text-orange-500 dark:text-white"
                href=" "
              >
                Ideation
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-orange-400 hover:text-orange-500 dark:text-white"
                href=" "
              >
                Developement
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-orange-400 hover:text-orange-500 dark:text-white"
                href=" "
              >
                photography
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-orange-400 hover:text-orange-500 dark:text-white"
                href=" "
              >
                <a href=" ">Management</a>
              </a>
            </li>
          </ul>
        </div>

        {/* Course card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <CourseCard
            bidders={[avatar1, avatar2, avatar3]}
            title="How to create an authentic experience"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <CourseCard
            bidders={[avatar1, avatar2, avatar3]}
            title="How to create an experience programming"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <CourseCard
            bidders={[avatar1, avatar2, avatar3]}
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
