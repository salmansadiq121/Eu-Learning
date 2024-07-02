import Heading from "@/app/utils/Heading";
import Loader from "@/app/utils/Loader";
import { useGetCoursesContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

type Props = {
  id: any;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCoursesContentQuery(id, { refetchOnMountOrArgChange: true });
  console.log("VideoData:", contentData);
  const data = contentData?.content;
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <Heading
            title={data[activeVideo]?.title}
            description="EULearning is a plateform for students to learn and get help from teachers"
            keywords={data[activeVideo]?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
          />
          {/* overflow-y-scroll message */}
          <div className="w-full min-h-screen  text-black dark:text-white py-5 px-1 sm:px-2">
            <div className="w-full grid 800px:grid-cols-10">
              <div className="col-span-7">
                <CourseContentMedia
                  data={data}
                  id={id}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  user={user}
                  refetch={refetch}
                />
              </div>
              <div className="hidden 800px:block 800px:col-span-3">
                <CourseContentList
                  setActiveVideo={setActiveVideo}
                  data={data}
                  activeVideo={activeVideo}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseContent;
