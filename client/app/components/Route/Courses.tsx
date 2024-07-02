import { useGetUserAllCoursesQuery } from "../../../redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="mt-8 w-full min-h-screen py-4 px-2 sm:px-4 dark:text-white ">
      <div className="w-[95%] 800px:w-[90%] m-auto">
        <h1 className="w-full text-center text-3xl sm:text-5xl font-[600] leading-[35px]">
          Expand Your Career{" "}
          <span className="text-gradient font-[600]">Opportunity</span> <br />{" "}
          Opportunity With Our Courses
        </h1>
        <br /> <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[20px] lg:grid-cols-3 1500px:grid-cols-4 mb-12 border-0">
          {courses &&
            courses?.map((item: any, index: any) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
