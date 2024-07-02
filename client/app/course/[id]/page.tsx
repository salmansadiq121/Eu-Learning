"use client";
import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

type Props = {};

const Page = ({ params }: any) => {
  const id = params.id;

  return (
    <div>
      {/* Course Details */}
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
