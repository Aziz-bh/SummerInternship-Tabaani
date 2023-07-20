import Card from "components/card";

const CourseCard = ({ title, image, extra }) => {
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>

        <div className="p-![18px] mb-3 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="  whitespace-nowrap text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
          </div>
        </div>
        <div className="mt-1 mb-3 flex justify-around md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-navy-700 dark:text-white">
              17
            </p>
            <p className="text-sm font-normal text-gray-600">Lessons</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-navy-700 dark:text-white">
              198
            </p>
            <p className="text-sm font-normal text-gray-600">Students</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-navy-700 dark:text-white">
              434
            </p>
            <p className="text-sm font-normal text-gray-600">Following</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
