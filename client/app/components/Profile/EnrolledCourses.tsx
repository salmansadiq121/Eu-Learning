import React from "react";
import CourseCard from "../Course/CourseCard";
import Image from "next/image";

type Props = {
  courses: any;
};

const EnrolledCourses = ({ courses }: Props) => {
  return (
    <div className="w-full min-h-screen text-black dark:text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {courses &&
          courses?.map((item: any, index: any) => (
            <CourseCard item={item} key={index} />
          ))}
      </div>
      {courses.length === 0 && (
        <div className="flex items-center flex-col gap-0 justify-center w-full h-full">
          <Image src="/empty.png" alt="Empty" height={150} width={150} />
          <h1 className="text-center font-medium text-[19px]">
            You don&apos;t have any purchased courses!
          </h1>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
