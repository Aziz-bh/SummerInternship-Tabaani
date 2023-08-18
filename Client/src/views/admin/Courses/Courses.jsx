import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function MyCourses() {
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourserDescription, setNewCourseDescription] = useState("");
  const [newCourselevel, setNewCourselevel] = useState("");
  const [newCourseinstructor, setNewCourseinstructor] = useState("");
  const [newCourseprice, setNewCourseprice] = useState("");
  const [newCoursechap, setNewCoursechap] = useState("");
  const handleAddCourseClick = () => {
    setShowForm(true);
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);

  };
  const [selecteduserpic, setSelecteduserpic] = useState(null);
  const handleImageChange2 = (event) => {
  setSelecteduserpic(event.target.files[0]);

  };


  useEffect(() => {
    // Fetch course data from your Node.js backend API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCoursesData(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);


      const response = await axios.post('http://localhost:5000/api/course', formData);
      const newCourse = response.data;
      // Update the coursesData with the new course
      setCoursesData((prevCourses) => [...prevCourses, newCourse]);
      console.log('Course added successfully');
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
    setShowForm(false);
  };
  return (

    <div className="container mx-auto py-4">

      {/* {showForm ? (

        <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="title" id="title" onChange={(e) => setNewCourseTitle(e.target.value)} class="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
      type="file"
      name="image"
      id="image"
      onChange={handleImageChange}
      className="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      required
    />
            <label
              htmlFor="userpic"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select a userpic
            </label>
          </div> 
          <div class="relative z-0 w-full mb-6 group">
            <label for="level" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Level</label>
            <select
              name="level"
              id="level"
              className="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="hard">Hard</option>
              <option value="intermediate">Intermediate</option>
              <option value="easy">Easy</option>
            </select>
          </div>


          <div className="relative z-0 w-full mb-6 group">
            <input
      type="file"
      name="userpic"
      id="userpic"
      onChange={handleImageChange2}
      className="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      required
    />
            <label
              htmlFor="userpic"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select a userpic
            </label>
          </div> 
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="chaptersnumber" id="chaptersnumber" onChange={(e) => setNewCoursechap(e.target.value)}
              className="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="chaptersnumber" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chapters</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="instructor" id="instructor" onChange={(e) => setNewCourseinstructor(e.target.value)} class="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="instructor" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Instructor Name</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="description" id="description" onChange={(e) => setNewCourseDescription(e.target.value)} class="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="description" class=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">description</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="price" id="price" onChange={(e) => setNewCourseprice(e.target.value)} class="block py-0.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-1000 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">price</label>
          </div>



          <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white">
            Save Course
            <MdOutlineKeyboardArrowRight size={20} />
          </button>

        </form>

      ) : ( */}
      <Link to={`form`}>
        <button
          className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white"
          onClick={handleAddCourseClick}
        >
          Add Course
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
        </Link>
      {/* )} */}
      {/* {previewImage && ( // Display the preview image if available
        <img
          className="h-56 rounded-l-lg object-cover md:hidden lg:block"
          src={previewImage}
          alt="Preview"
        />
      )} */}
      <CourseList />
    </div>
  )
}
