"use client";
import React, { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import { useSearchParams } from "next/navigation";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../utils/Loader";
import CourseCard from "../components/Course/CourseCard";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Category", {});
  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item?.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;
  console.log(categories);
  return (
    <div className="text-black dark:text-white">
      <Heading
        title="Courses - EULearning"
        description="EULearning is a plateform for students to learn and get help from teachers"
        keywords="EULearning, MERN, SASS,Redux, Context API, education, learning, programming, JavaScript, React, Node, Express, MongoDB, MySQL, Next JS, TypeScript, HTML, CSS , Prisma , Projects"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      {/*  */}
      <div className="w-full min-h-[80vh]">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="w-[98%] 800px:w-[90%]  m-auto ">
              {/* ALl Categories */}
              {!search && (
                <div className="w-full flex items-center flex-wrap gap-4 mt-4 transition-all duration-150">
                  <button
                    className={`h-[2.4rem] min-w-[5.5rem]  transition-all duration-150 rounded-[1.5rem] cursor-pointer py-2 px-4 ${
                      category === "All"
                        ? "bg-sky-600 text-white"
                        : "bg-transparent border-2 dark:border-gray-200 flex items-center justify-center border-gray-700 "
                    } `}
                    onClick={() => setCategory("All")}
                  >
                    All
                  </button>

                  {categories &&
                    categories?.map((item: any, index: any) => (
                      <div className="" key={index}>
                        <button
                          className={`h-[2.4rem] min-w-[5.5rem] py-2 px-4  transition-all duration-150 rounded-[1.5rem] cursor-pointer ${
                            category === item.title
                              ? "bg-sky-600 text-white"
                              : "bg-transparent border-2 dark:border-gray-200 flex items-center justify-center border-gray-700 py-2 px-4"
                          } `}
                          onClick={() => setCategory(item.title)}
                        >
                          {item?.title}
                        </button>
                      </div>
                    ))}
                </div>
              )}
              {/* All Courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ">
                {courses &&
                  courses.map((course: any, index: any) => (
                    <CourseCard item={course} key={index} />
                  ))}
              </div>
              {courses && courses.length === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col ">
                    <Image
                      src="/empty.png"
                      alt="Empty"
                      height={300}
                      width={300}
                    />
                    <h3 className="text-center font-medium text-black dark:text-white text-[18px]">
                      {search
                        ? "No Course found!"
                        : "No course found in this category. Please try  another one!"}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
