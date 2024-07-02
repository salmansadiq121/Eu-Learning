import Ratings from "@/app/utils/Ratings";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import CourseContentList from "./CourseContentList";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { style } from "@/app/styles/style";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: any;
  setOpen: any;
  setRoute: any;
};

const CourseDetail = ({
  data,
  stripePromise,
  clientSecret,
  setOpen: loginOpen,
  setRoute,
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [isReply, setIsReply] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  // discountPercentage-------->
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      loginOpen(true);
    }
  };
  return (
    <div className="w-full h-screen overflow-y-scroll message text-black dark:text-white py-5 px-3 sm:px-4">
      <div className="w-[98%] 800px:w-[95%] m-auto ">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          {/* Left */}
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className=" text-2xl sm:text-4xl font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <Ratings rating={data?.ratings} />{" "}
                <span>{data?.reviews?.length} Reviews</span>
              </div>
              <h5>{data?.purchased} Students</h5>
            </div>
            <br />
            <div className="w-full">
              <h1 className="text-[25px]  font-[600] font-Poppins">
                What you will learn from this course?
              </h1>
              {data?.benefits?.map((item: any, index: any) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="mr-1 w-[15px]">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>
                  <p className="pl-2">{item?.title}</p>
                </div>
              ))}
            </div>
            <br />
            <div className="w-full">
              <h1 className="text-[25px]  font-[600] font-Poppins">
                What are the prerequisites for starting this course?
              </h1>
              {data?.prerequisites?.map((item: any, index: any) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="mr-1 w-[15px]">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>
                  <p className="pl-2">{item?.title}</p>
                </div>
              ))}
            </div>
            <br />
            {/*  */}
            <div className="">
              <h1 className="text-[25px]  font-[600] font-Poppins">
                Course Overview
              </h1>
              {/* CourseContentList */}
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            {/*  */}
            <br />
            <br />
            {/* Course Description */}
            <div className="w-full">
              <h1 className="text-[25px]  font-[600] font-Poppins">
                Course Description
              </h1>
              <p className="text-[16px] mt-3 whitespace-pre-line w-full overflow-hidden">
                {data?.description}
              </p>
            </div>
            {/*  */}
            <div className="w-full mt-6">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]">
                  <h3 className="text-[24px] text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    Course Ratings • {data?.reviews?.length} Reviews
                  </h3>
                </div>
              </div>
            </div>
            {/* Reviews Data */}
            <div className="w-full mt-4">
              {data?.reviews &&
                [...data.reviews].reverse().map((item: any, index: any) => (
                  <>
                    <div
                      className="w-full pb-4 flex items-start gap-2 "
                      key={index}
                    >
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-sky-500  rounded-[50%] flex items-center justify-center cursor-pointer">
                          {item?.user?.avatar ? (
                            <Image
                              src={item?.user?.avatar?.url}
                              alt="Avatar"
                              width={50}
                              height={50}
                              className="rounded-full w-[3rem] h-[3rem]  "
                            />
                          ) : (
                            <h1 className="uppercase text-white font-[600] text-[18px]">
                              {item?.user?.name.slice(0, 2)}
                            </h1>
                          )}
                        </div>
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2">
                            {item?.user.name}
                          </h5>
                          <Ratings rating={item?.rating} />
                        </div>
                        <p className="">{item?.comment}</p>
                        <small>{format(item?.createdAt)}</small>
                        {/* -------------------- */}
                        {/* All Replies  */}
                        <div className="pb-2">
                          {item?.commentReplies.length !== 0 && (
                            <div
                              className={` w-full flex items-center gap-4 mt-2`}
                            >
                              <h4
                                className="font-semibold text-[17px] dark:text-gray-200 text-gray-700 cursor-pointer "
                                onClick={() => {
                                  setReviewId(item._id);
                                  setIsReply(!isReply);
                                }}
                              >
                                All Replies
                              </h4>
                              <span
                                className=" flex items-center gap-1 mt-1 text-[18px] font-semibold"
                                onClick={() => {
                                  setReviewId(item._id);
                                  setIsReply(!isReply);
                                }}
                              >
                                <FaRegComment className="text-sky-500 cursor-pointer h-5 w-5" />{" "}
                                {item?.commentReplies.length}
                              </span>
                            </div>
                          )}
                          {/* ALl Replies */}
                          {isReply && reviewId === item._id && (
                            <>
                              {item?.commentReplies?.map((i: any) => (
                                <div className="flex gap-3 mt-3" key={item._id}>
                                  <div className="w-[43px] h-[43px]">
                                    <div className="w-[40px] h-[40px] bg-sky-500  rounded-[50%] flex items-center justify-center cursor-pointer">
                                      {i?.user?.avatar ? (
                                        <Image
                                          src={item?.user?.avatar?.url}
                                          alt="Avatar"
                                          width={40}
                                          height={40}
                                          className="rounded-full w-[2.5rem] h-[2.5rem]  "
                                        />
                                      ) : (
                                        <h1 className="uppercase text-white font-[500] text-[19px]">
                                          {i?.user?.name.slice(0, 1)}
                                        </h1>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <h5 className="text-[18px] flex items-center gap-2">
                                      {i?.user?.name}
                                      <span>
                                        {i?.user?.role === "admin" && (
                                          <MdVerified className="h-5 w-5 text-green-500" />
                                        )}
                                      </span>
                                    </h5>
                                    <p className="text-[14px]">{i?.comment}</p>
                                    <small className=" text-gray-600 dark:text-gray-300 mt-1">
                                      {format(i?.createdAt)} •
                                    </small>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      {/* ------------Mobile Screen------- */}
                      <div className="flex 800px:hidden flex-col gap-0">
                        <div className="pl-2 flex 800px:hidden items-center">
                          <h5 className="text-[18px] pr-2">
                            {item?.user.name}
                          </h5>
                          <Ratings rating={item?.rating} />
                        </div>
                        {/* -------------------- */}
                        {/* All Replies  */}
                        <div className="pb-2 pl-[.5rem]">
                          {item?.commentReplies.length !== 0 && (
                            <div
                              className={` w-full flex items-center gap-4 mt-2`}
                            >
                              <h4
                                className="font-semibold  text-[17px] dark:text-gray-200 text-gray-700 cursor-pointer "
                                onClick={() => {
                                  setReviewId(item._id);
                                  setIsReply(!isReply);
                                }}
                              >
                                All Replies
                              </h4>
                              <span
                                className=" flex items-center gap-1 mt-1 text-[18px] font-semibold"
                                onClick={() => {
                                  setReviewId(item._id);
                                  setIsReply(!isReply);
                                }}
                              >
                                <FaRegComment className="text-sky-500 cursor-pointer h-5 w-5" />{" "}
                                {item?.commentReplies.length}
                              </span>
                            </div>
                          )}
                          {/* ALl Replies */}
                          {isReply && reviewId === item._id && (
                            <>
                              {item?.commentReplies?.map((i: any) => (
                                <div className="flex gap-3 mt-3" key={item._id}>
                                  <div className="w-[43px] h-[43px]">
                                    <div className="w-[40px] h-[40px] bg-sky-500  rounded-[50%] flex items-center justify-center cursor-pointer">
                                      {i?.user?.avatar ? (
                                        <Image
                                          src={item?.user?.avatar?.url}
                                          alt="Avatar"
                                          width={40}
                                          height={40}
                                          className="rounded-full w-[2.5rem] h-[2.5rem]  "
                                        />
                                      ) : (
                                        <h1 className="uppercase text-white font-[500] text-[19px]">
                                          {i?.user?.name.slice(0, 1)}
                                        </h1>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <h5 className="text-[18px] flex items-center gap-2">
                                      {i?.user?.name}
                                      <span>
                                        {i?.user?.role === "admin" && (
                                          <MdVerified className="h-5 w-5 text-green-500" />
                                        )}
                                      </span>
                                    </h5>
                                    <p className="text-[14px]">{i?.comment}</p>
                                    <small className=" text-gray-600 dark:text-gray-300 mt-1">
                                      {format(i?.createdAt)} •
                                    </small>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          {/* Right */}
          {/* Video Section */}
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[0px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.name} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px]">
                  {data?.price === 0 ? "Free" : data?.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                  {data?.estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-4 text-[22px]">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={`${style.button} !w-[180px] flex items-center justify-center my-3 font-Poppins !bg-[crimson] cursor-pointer`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    onClick={handleOrder}
                    className={`${style.button}  !w-[180px] flex items-center justify-center my-3 font-Poppins !bg-[crimson] cursor-pointer `}
                  >
                    Buy Now {data?.price}$
                  </div>
                )}
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
          </div>
        </div>
      </div>
      {/* Stripe */}
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-[999] flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetail;
