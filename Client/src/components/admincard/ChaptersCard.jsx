import React, { useState,useEffect } from "react";
import axios from 'axios'; 
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router-dom";


const ChaptersCard = ( {chapters = [],
  lessons = [],
  onLessonClick,
  onChapterClick,}) => {
  const [openChapter, setOpenChapter] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterDescription, setNewChapterDescription] = useState("");
  const [newChapterLessons, setNewChapterLessons] = useState([]);
  const [chaptersData, setChaptersData] = useState([]);
  const { id} = useParams(); 
 

 const toggleChapter = (index) => {
  if (openChapter === index) {
    setOpenChapter(null);
  } else {
    setOpenChapter(index);

  }
};


  
  useEffect(() => {
   
    const fetchChaptersData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/${id}/getchapter`);
        setChaptersData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChaptersData();
  }, [id]);



  const handleAddChapter = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/course/${id}/add-chapter`,
        {
          title: newChapterTitle,
          description: newChapterDescription,
          lessons: newChapterLessons,
        }
      );

      console.log("Chapter added successfully");
    } catch (error) {
      console.error(error);
    }

    setShowForm(false);
  };


  const handleAddLesson = () => {
    setNewChapterLessons((prevLessons) => [
      ...prevLessons,
      { title: "", lessonvideo: "" , lessondescription: ""},
    ]);
  };

  const handleLessonChange = (index, field, value) => {
    setNewChapterLessons((prevLessons) =>
      prevLessons.map((lesson, i) =>
        i === index ? { ...lesson, [field]: value } : lesson
      )
    );
  };
  
  

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Course Overview</h2>
      <ul>
  {chaptersData.map((chapter, index) => (
    <li key={index} className="mb-4 border-b border-gray-300 pb-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{chapter.title}</span>
        <button
          type="button"
          className="p-1"
          onClick={() => toggleChapter(index)}
        >
          {openChapter === index? (
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          )}
        </button>
      </div>
      {openChapter === index && (
        
        <div>
           {chapter.lessons && chapter.lessons.length > 0 ? (
                  chapter.lessons.map((lesson, lessonIndex) =>
                    lesson && lesson.title ? (
                      <li
                        key={lessonIndex}
                        className="cursor-pointer py-2 pl-4"
                        onClick={() => {
                          onChapterClick(index);
                          onLessonClick(lessonIndex);
                        }}
                      >
                        {lesson.title}
                      </li>
                   
                    ) : null
                  )
                ) : null}
          
   
        </div>
      )}
    </li>
  ))}
  <div></div>
      
   
</ul>


      <div></div>
      
      {showForm ? (
        <form onSubmit={handleAddChapter}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="chapterTitle"
              id="chapterTitle"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="chapterTitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="chapterDescription"
              id="chapterDescription"
              value={newChapterDescription}
              onChange={(e) => setNewChapterDescription(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="chapterDescription"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Description
            </label>
          </div>
          {newChapterLessons.map((lesson, index) => (
            <div key={index}>
             
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name={`lessonTitle${index}`}
                  id={`lessonTitle${index}`}
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(index, "title", e.target.value)
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`lessonTitle${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Lesson Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name={`ldescription${index}`}
                  id={`ldescription ${index}`}
                  value={lesson.lessondescription}
                  onChange={(e) =>
                    handleLessonChange(index, "lessondescription", e.target.value)
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`ldescription${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Lesson Description
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name={`lessonVideo${index}`}
                  id={`lessonVideo${index}`}
                  value={lesson.lessonvideo}
                  onChange={(e) =>
                    handleLessonChange(index, "lessonvideo", e.target.value)
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`lessonVideo${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Lesson Video URL
                </label>
              </div>
            </div>
          ))}
        <div className="flex gap-2">
      <button
        className="flex items-center justify-center rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
        type="button"
        onClick={handleAddLesson}
      >
        Add Lesson
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
      <button
        className="flex items-center justify-center rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
        type="submit"
      >
        Save Chapter
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
        </form>
      ) : (
        <button
          className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white"
          onClick={() => setShowForm(true)}
        >
          Add Chapter
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ChaptersCard;
