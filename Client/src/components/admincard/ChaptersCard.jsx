import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MdOutlineKeyboardArrowRight, MdDeleteOutline, MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import  vectorimage from "assets/icons/logo1.png";

const ChaptersCard = ({ chapters = [], lessons = [],
  onLessonClick,
  onChapterClick,

}) => {
  const [openChapter, setOpenChapter] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterDescription, setNewChapterDescription] = useState("");
  const [newChapterLessons, setNewChapterLessons] = useState([]);
  const [newlessonTitle, setNewlessonTitle] = useState("");
  const [newlessonDescription, setNewlessonDescription] = useState("");
  const [newLessonvideo, setNewLessonvideo] = useState("");
  const [chaptersData, setChaptersData] = useState([]);
  const { id } = useParams();
 
  const toggleChapter = (index) => {

    if (openChapter !== index) {
      setOpenChapter(index);

      console.log("chap"+index);
    } else {
      setOpenChapter(null);
      

    }
  };



  const handleDeleteChapter = async (chapterId) => {
    try {
      await axios.delete(`http://localhost:5000/api/course/${id}/deletechapter/${chapterId}`);
      console.log(`Chapter ${chapterId} deleted successfully`);

      // Mettez à jour les données de chapitre en supprimant le chapitre supprimé
      setChaptersData((prevChapters) =>
        prevChapters.filter((chapter) => chapter.id !== chapterId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les chapitres
        const chaptersResponse = await axios.get(`http://localhost:5000/api/course/${id}/getchapter`);
        const chaptersWithId = chaptersResponse.data.map((chapter) => ({
          ...chapter,
          id: chapter.id
        }));

        // Récupérer les leçons associées à chaque chapitre
        const chaptersWithLessons = await Promise.all(chaptersWithId.map(async (chapter) => {
          const lessonsResponse = await axios.get(`http://localhost:5000/api/course/${id}/chapter/${chapter.id}/getlesson`);
          const lessons = lessonsResponse.data; 
        
          const lessonsWithId = lessons.map((lesson) => ({
            
            id: lesson.id // Ajouter l'ID de la leçon
          }));
        
          console.log("hello", lessonsWithId);// Assurez-vous que les données de la leçon sont correctes ici
          return {
            ...chapter,
            lessons: lessons,
            lesson: lessonsWithId,
           
          };
        }));

        setChaptersData(chaptersWithLessons);
        console.log(chaptersWithLessons);
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);




  const handleAddChapter = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/course/${id}/add-chapter`,
        {
          title: newChapterTitle,
          description: newChapterDescription,

        }
      );

      console.log("Chapter added successfully");
    } catch (error) {
      console.error(error);
    }

    setShowForm(false);
  };

  const handleAddLesson = async (e) => {
   
    try {
      if (openChapter !== null) {
        const chapter = chaptersData.find((chapter) => chapter.id === openChapter);
        if (chapter) {
          const response = await axios.post(
            `http://localhost:5000/api/course/${id}/chapter/${chapter.id}/add-lesson`,
            {  
              LessonTitle: newlessonTitle,
              LessonDescription: newlessonDescription,
              lessonVideo: newLessonvideo,
            }
          );
          
          const newLessonId = response.data.lessonId;
          
          console.log("Lesson added successfully with ID:", newLessonId);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setShowForm2(false);
  };
  



  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Course Overview</h2>
      <ul>
        {chaptersData 
          .filter(chapter => chapter && chapter.title)
          .sort((a, b) => a.chapterIndex - b.chapterIndex)
          .map((chapter, index) =>( 
          <li key={index} className="mb-4 border-b border-gray-300 pb-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img
                  src= {vectorimage}
                  alt="Avatar"
                  className="h-16 w-16 rounded-lg bg-gray-500 object-cover"
                />
                <span className="text-lg font-medium">{chapter.title}</span>
              </div>

              <button
                type="button"
                className="p-1"
                onClick={() => toggleChapter(chapter.id)}

              >
                {openChapter === chapter.id ? (
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

            {openChapter === chapter.id && (

              <div>
                {
                chapter.lessons && chapter.lessons.length > 0 ? (
                  chapter.lessons
                  .filter(lesson => lesson && lesson.LessonTitle)
                  .sort((a, b) => a.lessonIndex - b.lessonIndex)
                  .map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="cursor-pointer py-2 pl-4"
                      onClick={() => {
                        onChapterClick(chapter.id, index);
                        onLessonClick(lesson.id, lessonIndex);
                      }}
                    >
                      <span className="hover:text-yellow-500">
                        Lesson {lessonIndex + 1} : {lesson.LessonTitle}
                      </span>
                    </li>
                  ))
                

                    
                  )
                : null}
                <div class="mt-8 h-full "></div>

                {showForm2 ? (
                  <form onSubmit={handleAddLesson}>


                    <div className="relative z-0 w-full mb-6 group">
                      <button className="absolute top-0 right-2 p-1 h-6 w-6 text-gray-600" onClick={() => setShowForm2(false)}>
                        <MdClose size={24} />
                      </button>
                      <input
                        type="text"
                        name="lesssonTitle"
                        id="lessonTitle"
                        value={newlessonTitle}
                        onChange={(e) => setNewlessonTitle(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="lessonTitle"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        lesson Title
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="lessonDescription"
                        id="lessonDescription"
                        value={newlessonDescription}
                        onChange={(e) => setNewlessonDescription(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="chapterDescription"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        lesson Description
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="lessonVideo"
                        id="lessonVideo"
                        value={newLessonvideo}
                        onChange={(e) => setNewLessonvideo(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="lessonVideo"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        lesson video
                      </label>
                    </div>



                    <button
                      className="flex items-center justify-center rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
                      type="submit"

                    >
                      save Lesson
                      <MdOutlineKeyboardArrowRight size={20} />
                    </button>


                  </form>
                ) : (

                  <div className=" flex space-x-4">

                    <button
                      className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
                      onClick={() => setShowForm2(true)}
                    >
                      Add lesson
                      <MdOutlineKeyboardArrowRight size={20} />
                    </button>

                    <button
                      className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1 pl-6 pr-2 text-center text-sm font-medium capitalize leading-tight text-white"
                      onClick={() => handleDeleteChapter(chapter.id)}
                    >
                      <MdDeleteOutline size={20} />
                      <MdOutlineKeyboardArrowRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
        <div class="mt-8 h-full "></div>
      </ul>
      {showForm ? (
        <form onSubmit={handleAddChapter}>

          <div className="relative z-0 w-full mb-6 group">
            <button className="absolute top-0 right-2 p-1 h-6 w-6 text-gray-600" onClick={() => setShowForm(false)}>
              <MdClose size={24} />
            </button>
            <input
              type="text"
              name="chapterTitle"
              id="chapterTitle"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="chapterTitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="chapterDescription"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chapter Description
            </label>
          </div>

          <div className="flex gap-2">

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
