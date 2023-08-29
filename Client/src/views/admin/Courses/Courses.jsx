import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import axios from 'axios';


export default function MyCourses() {
  
  return (

    <div className="container mx-auto py-4">
      <CourseList />
    </div>
  )
}
