import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import useFetchAllUsers from "../../../hooks/FetchAllUsersHook";
import Card from "components/card";
import uploadFilead from "utils/uploadFileadm";

export default function CourseForm() {
  // const [profilePicture, setProfilePicture] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.target);
  
  
      if (selectedImage) {
       const imageUrl= await uploadFilead(selectedImage, setUploadProgress);
        formData.append("imageURL", imageUrl); 
      }
  
      const response = await axios.post("http://localhost:5000/api/course", formData);
      const newCourse = response.data;
      console.log("course ", newCourse)
      
      setCoursesData((prevCourses) => [...prevCourses, newCourse]);
      console.log("Course added successfully");
      
      e.target.reset();
      setSelectedImage(null);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorAlert(true);
      setTimeout(() => {
      setErrorAlert(false);
    }, 3000);
    }
  };
  


  const { users } = useFetchAllUsers();


  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold  dark:text-white">Add course</div>
      </div>
      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden"></div>

      {successAlert && (
        <div
          class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Success!</span> Course added successfully.
        </div>
      )}
      {errorAlert && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          An error occurred while adding the course. Please try again.
        </div>
      )}
      <form onSubmit={handleFormSubmit} encType="multipart/form-data w-20">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-white">Image</label>
            <div
              class="mt-1 flex cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-500 bg-gray-100 px-6 pb-6 pt-5"
              style={{
                backgroundImage: selectedImage
                ? `url(${URL.createObjectURL(selectedImage)})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
            >
              <div class="space-y-1 text-center">
                <label for="image" class="cursor-pointer ">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-600"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    
                    class="sr-only"
                    placeholder=" "
                    required
                  />
                    
                </label>
                <div class="flex text-sm text-gray-600">
                  <label for="image" class="relative cursor-pointer ">
                    <span class="text-sm font-bold text-navy-700 dark:text-white">
                      Upload thumbnail{" "}
                    </span>
                  </label>
                  <p class="pl-1 text-gray-600">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <p>image upload progress : {uploadProgress}%</p>
          </div>
          
        </div>
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              class="text-sm font-bold text-navy-700 dark:text-white"
              for="title"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              class="mt-2 block w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 focus:border-orange-500 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300  dark:focus:border-orange-500"
              placeholder=" "
              required
            />
          </div>

          <div>
            <label
              class="text-sm font-bold text-navy-700 dark:text-white"
              for="instructorId"
            >
              Instructor
            </label>
            <select
              name="instructorId"
              id="instructorId"
              class="mt-2 block w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-bold text-navy-700 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 dark:text-white dark:focus:border-orange-500"
            >
             {users.map(user => user.role === 'instructor' ? (
                <option key={user.id} value={user.id}>
                  {user.displayName} - Role: {user.role}
                </option>
              ) : null)}

            </select>
          </div>

          <div>
            <label
              class="text-sm font-bold text-navy-700 dark:text-white"
              for="description"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              class="mt-2 block w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 focus:border-orange-500 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-orange-500"
              placeholder=" "
              required
            />
          </div>
          <div>
            <label
              class="text-sm font-bold text-navy-700 dark:text-white"
              for="level"
            >
              Level
            </label>
            <select
              name="level"
              id="level"
              class="mt-2 block w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-bold text-navy-700 focus:border-orange-500 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 dark:text-white dark:focus:border-orange-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label
              class="text-sm font-bold text-navy-700 dark:text-white"
              for="price"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              class="dark:focus:border-blorangeue-500 mt-2 block w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 focus:border-orange-500 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              placeholder=" "
              required
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            className="flex  items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white"
            type="submit"
          >
            Save Course
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </form>
    </Card>
  );
}
