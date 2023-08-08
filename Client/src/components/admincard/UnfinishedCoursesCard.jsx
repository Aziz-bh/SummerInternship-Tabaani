import Progress from "C:/Users/hadil/Desktop/admin/src/components/progress";
import { FaTrophy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';
//import OIPImage from 'C:/Users/hadil/Desktop/admin/src/assets/logos/OIP.jpeg';

const UnfinishedCoursesCard = ({ title, Image ,pic ,courseId,teachername,lessonnumber,studentnumber,teacherspeciality,studentlevel}) => {
  const progressValue = 50;
  const handleDeleteCourse = () => {
    axios
      .delete(`http://localhost:5000/api/course/${courseId}`)
      .then((response) => {
        // Course deleted successfully, you can update the UI or show a success message
        console.log('Course deleted successfully');
      })
      .catch((error) => {
        // Handle errors if the course deletion fails
        console.error('Error deleting course:', error);
      });
     
      
  };
  const baseUrl = "http://localhost:5000/uploads/";
  return (
    <div className="bg-neutral-50 border-zinc-100 inline-flex w-full items-start justify-start gap-4 rounded-lg border bg-white pr-6">
      <div className="h-56 w-[356px] rounded-[10px]">
        <img
          className=" h-56 rounded-l-lg object-cover md:hidden lg:block "
          src={Image}
          alt="Picture"
        
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="inline-flex flex-col items-start justify-start gap-2 py-4 pb-6">
          <div className="text-md h-[19px] w-[329px]  font-bold ">{title}</div>
        </div>

        <div className="inline-flex items-center justify-between pb-8">
          <div className="flex items-center justify-start gap-2">
            <FaBook size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Lesson : {lessonnumber}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaUser size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              student : {studentnumber}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaTrophy size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
            {studentlevel}
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-between gap-2 pb-8">
          <Progress value={progressValue} />
          <p className=" text-sm"> {progressValue}%</p>
        </div>

        <div className="inline-flex items-end justify-between">
          <div className="flex h-11 items-center justify-start gap-2.5">
            <div className="relative h-11 w-11">
              <img
                className="h-11 w-11 rounded-lg object-cover"
                src={pic}
                alt=""
              />
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1 rounded-lg">
              <div className="text-stone-700 self-stretch text-sm font-medium leading-snug tracking-tight">
              {teachername}
              </div>
              <div className="text-stone-700 l text-xs font-normal tracking-tight text-opacity-75">
              {teacherspeciality}
              </div>
            </div>
          </div>
          <button
  className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
  onClick={() => handleDeleteCourse()}
>
  Delete
  <MdOutlineKeyboardArrowRight size={20} />
</button>

          <div></div>
          <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white">
            Update
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
          
        
        </div>
      </div>
    </div>
  );
};

export default UnfinishedCoursesCard;
