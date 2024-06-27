import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { style } from "@/app/styles/style";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[90%] m-auto py-5 mb-5 ">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${style.button} !w-[180px] flex items-center justify-center my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${style.input} !w-[50%]  !mt-0`}
          />
          <div
            className={`${style.button} !w-[120px] flex items-center justify-center my-3 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">• Source code include</p>
        <p className="pb-1">• Full lifetime access</p>
        <p className="pb-1">• Certificate of completion</p>
        <p className="pb-3 800px:pb-1">• Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600px]">
            {courseData?.name}
          </h1>
          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5 className="text-[16px] text-black dark:text-white font-medium">
                0 Reviews
              </h5>
            </div>
            <h5 className="text-[16px] text-black dark:text-white font-medium">
              0 Students
            </h5>
          </div>
          <br />
          <h1 className="text-[25px]  font-[600] font-Poppins">
            What you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: any) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="mr-1 w-[15px]">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item?.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px]  font-[600] font-Poppins">
            What are the prerequisites for starting this course?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: any) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="mr-1 w-[15px]">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item?.title}</p>
            </div>
          ))}
        </div>

        <br />
        <br />
        {/* Course Description */}
        <div className="w-full">
          <h1 className="text-[25px]  font-[600] font-Poppins">
            Course Description
          </h1>
          <p className="text-[16px] mt-3 whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className=" w-full flex items-center gap-2 justify-between">
        <button
          type="button"
          onClick={() => setActive(active - 1)}
          className="w-full 800px:w-[100px] h-[40px] bg-[#37a39a] hover:bg-[#288e86] transition duration-150 text-center text-[#fff] rounded mt-6 cursor-pointer"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => createCourse()}
          className="w-full 800px:w-[100px] h-[40px] bg-[#37a39a] hover:bg-[#288e86] transition duration-150 text-center text-[#fff] rounded mt-6 cursor-pointer"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
