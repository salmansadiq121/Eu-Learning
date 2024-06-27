"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: any;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState(0);
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  //   Get Course Data
  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories: editCourseData.categories,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  // Submit Data
  const handleSubmit = async () => {
    // 1 Format Benefits Array
    const formatBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format Prerequisites
    const formatPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format Course Content Array
    const formatCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      videoLength: courseContent.videoLength,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // Prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formatBenefits,
      prerequisites: formatPrerequisites,
      courseData: formatCourseContentData,
    };
    setCourseData(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course update successfully!");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const handleCourseUpdate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await editCourse({ id, data });
    }
  };

  return (
    <div className="w-full min-h-screen dark:bg-gray-900">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseUpdate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%]  h-screen fixed z-[1] top-[5rem] right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
