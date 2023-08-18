import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';

export default function CourseForm() {
    const [coursesData, setCoursesData] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
  
    };
    const [selecteduserpic, setSelecteduserpic] = useState(null);
    const handleImageChange2 = (event) => {
    setSelecteduserpic(event.target.files[0]);
  
    };
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
       
      };
  return (
    <div>


 <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h2 class="text-lg font-semibold text-black capitalize dark:text-white">Add Course</h2>
    
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
    <div className="grid grid-cols-2 gap-4">
    <div>
                <label class="block text-sm font-medium text-white">
                Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md bg-gray-300 cursor-pointer">
                <div class="space-y-1 text-center">
                <label for="image" class="cursor-pointer ">
                  <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <input id="image" name="image" type="file"  onChange={handleImageChange}class="sr-only"/>
                    </label>
                  <div class="flex text-sm text-gray-600">
                    <label for="image" class="cursor-pointer relative ">
                      <span class="">Upload a thumbnail </span>
                      <input id="image" name="image" type="file"  onChange={handleImageChange} class="sr-only"/>
                    </label>
                    <p class="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p class="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-white">
                Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md bg-gray-300 cursor-pointer">
                <div class="space-y-1 text-center">
                <label for="userpic" class="cursor-pointer ">
                  <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <input id="userpic" name="userpic" type="file"  onChange={handleImageChange2} class="sr-only"/>
                    </label>
                  <div class="flex text-sm text-gray-600">
                    <label for="userpic" class="cursor-pointer relative ">
                      <span class="">Upload Professor Picture </span>
                      <input id="userpic" name="userpic" type="file" onChange={handleImageChange2}  class="sr-only"/>
                    </label>
                    <p class="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p class="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            </div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray dark:text-gray-200" for="title">Title</label>
                <input id="title" name='title' type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none  focus:border-orange-500"/>
            </div>

            <div>
                <label class="text-gray dark:text-gray-200" for="chaptersnumber">Chapters number</label>
                <input id="chaptersnumber" name='chaptersnumber' type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-orange-500"/>
            </div>

            <div>
                <label class="text-gray dark:text-gray-200" for="instructor">Instructor name</label>
                <input id="instructor" name='instructor' type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-orange-500"/>
            </div>

            <div>
                <label class="text-gray dark:text-gray-200" for="description">Description</label>
                <input id="description" name='description'  type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-orange-500"/>
            </div>
            <div>
            <label class="text-gray dark:text-gray-200" for="level">Level</label>
                <select name="level"
              id="level" class="block w-full px-4 py-2 mt-2 text-gray bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-orange-500">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Hard</option>
                   
                </select>
            </div>
            <div>
                <label class="text-gray dark:text-gray-200" for="price">Price</label>
                <input id="price" name='price'  type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-orange-500"/>
            </div>
        </div>

        <div class="flex justify-end mt-6">
        <button className="flex  items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-1  pl-6 pr-2  text-center text-sm  font-medium capitalize leading-tight text-white" type='submit' >
            Save Course
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
         
        </div>
        
    </form>
</section>

    </div>
  )
}
