import { style } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddNewAnswerMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
  useGetCoursesDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import CommentReply from "./CommentReply";
import { MdVerified } from "react-icons/md";
import { format } from "timeago.js";
import Ratings from "@/app/utils/Ratings";
import { FaRegComment } from "react-icons/fa";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  activeVideo,
  setActiveVideo,
  id,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [
    addNewQuestion,
    {
      isLoading: addQuesionLoading,
      isSuccess: questionSuccess,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();
  const [
    addNewAnswer,
    {
      isLoading: addAnswerLoading,
      isSuccess: answerSuccess,
      error: answerError,
    },
  ] = useAddNewAnswerMutation();
  const [
    addReview,
    {
      isLoading: addReviewLoading,
      isSuccess: addReviewSuccess,
      error: addReviewError,
    },
  ] = useAddReviewMutation();
  const { data: courseData, refetch: courseRefetch } =
    useGetCoursesDetailsQuery(id, { refetchOnMountOrArgChange: true });

  const [addReviewReply, { isLoading, isSuccess, error }] =
    useAddReviewReplyMutation();

  // -----------Handle Questions--------->
  const handleQuestion = async () => {
    if (question.length === 0) {
      return toast.error("Question can't be empty!");
    } else {
      await addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (questionSuccess) {
      toast.success("Question add successfully");
      setQuestion("");
      refetch();
      // Send Socket Notification
      socketId.emit("notification", {
        title: "New Question Received!",
        message: `You have a new question in ${data[activeVideo]?.title}`,
        userId: user._id,
      });
    }
    if (questionError) {
      if ("data" in questionError) {
        const newMessage = questionError as any;
        toast.error(newMessage.data.message);
      }
    }
    // eslint-disable-next-line
  }, [questionSuccess, questionError]);

  // -------------Submit Answer----------
  const handleAnswerSubmit = async () => {
    if (answer.length === 0) {
      return toast.error("Answer can't be empty!");
    } else {
      await addNewAnswer({
        answer,
        courseId: id,
        contentId: data[activeVideo]._id,
        questionId: questionId,
      });
    }
  };

  useEffect(() => {
    if (answerSuccess) {
      toast.success("Answer add successfully");
      setAnswer("");
      refetch();
      if (user.role !== "admin") {
        // Send Socket Notification
        socketId.emit("notification", {
          title: "New Answer Received",
          message: `You have a new question reply in ${data[activeVideo]?.title}`,
          userId: user._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const newMessage = answerError as any;
        toast.error(newMessage.data.message);
      }
    }
    // eslint-disable-next-line
  }, [answerSuccess, answerError]);

  //--------- Finding Reviews----------
  const isReviewsExisting = courseData?.course?.reviews?.find((item: any) => {
    return item.user._id === user._id;
  });

  // ----------- Handle Add Reviews------------->

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      return toast.error("Review can't be empty!");
    } else {
      await addReview({
        review,
        rating,
        id,
      });
    }
  };

  useEffect(() => {
    if (addReviewSuccess) {
      toast.success("Review add successfully");
      setReview("");
      setRating(1);
      courseRefetch();
      // Send Socket Notification
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review  in ${data[activeVideo]?.title}`,
        userId: user._id,
      });
    }
    if (addReviewError) {
      if ("data" in addReviewError) {
        const newMessage = addReviewError as any;
        toast.error(newMessage.data.message);
      }
    }
    // eslint-disable-next-line
  }, [addReviewSuccess, addReviewError]);

  // ---------------------Review Reply--------->
  const handleReviewReply = async () => {
    if (comment.length === 0) {
      return toast.error("Reply can't be empty!");
    } else {
      await addReviewReply({
        comment,
        courseId: id,
        reviewId,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reply add successfully");
      setComment("");
      setIsReviewReply(false);
      courseRefetch();
    }
    if (error) {
      if ("data" in error) {
        const newMessage = error as any;
        toast.error(newMessage.data.message);
      }
    }
    // eslint-disable-next-line
  }, [isSuccess, error]);

  return (
    <div className="w-[98%] 800px:w-[86%] p-2 my-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between gap-4 my-3 mt-4">
        <button
          className={`${
            style.button
          } !min-h-[40px] max-w-[9.8rem] flex items-center justify-center !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="text-white mr-2" />
          Prev Lession
        </button>
        <button
          className={`${
            style.button
          } !min-h-[40px] max-w-[9.8rem] flex items-center justify-center !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lession
          <AiOutlineArrowRight className="text-white ml-2 mt-1" />
        </button>
      </div>
      <h1 className="pt-4 text-[25px] font-[600]">
        {data[activeVideo]?.title}
      </h1>
      <div className="w-full p-2 mt-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map(
          (text: any, index: any) => (
            <h5
              className={`800px:text-[20px]  cursor-pointer ${
                activeBar === index
                  ? "text-red-500 border-b-2 border-red-500"
                  : "dark:text-white text-black"
              }`}
              key={index}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          )
        )}
      </div>
      <br />
      {/* 0 */}
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line text-justify mb-4">
          {data[activeVideo]?.description}
        </p>
      )}
      {/* 1 */}
      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: any, index: any) => (
            <div className={`mb-5`} key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item?.title && item?.title + " :"}
              </h2>
              <Link
                href={item?.url}
                target="blank"
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item?.url}
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* 2 */}
      {activeBar === 2 && (
        <>
          <div className="w-full ">
            <div className="w-full flex gap-3">
              <div className="w-[53px] h-[53px] ">
                <Image
                  src={user?.avatar ? user?.avatar?.url : "/defaultProfile.png"}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full w-[3rem] h-[3rem] border-2 border-green-500 "
                />
              </div>
              <textarea
                cols={40}
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your questions..."
                className={`outline-none border bg-transparent dark:text-white text-black py-2 px-3 resize-none rounded-md shadow-md 800px:w-full text-[18px] w-[95%]`}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                disabled={addQuesionLoading}
                className={`${
                  style.button
                } flex items-center justify-center !w-[7rem] ${
                  addQuesionLoading ? "cursor-no-drop" : "cursor-pointer"
                }  `}
                onClick={handleQuestion}
              >
                {addQuesionLoading ? (
                  <BiLoaderAlt className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="w-full mt-[1rem]">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setAnswerId={setQuestionId}
              addAnswerLoading={addAnswerLoading}
            />
          </div>
        </>
      )}
      {/* 3 */}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewsExisting && (
              <div className="flex  gap-2">
                <div className="w-[53px] h-[53px] ">
                  <Image
                    src={
                      user?.avatar ? user?.avatar?.url : "/defaultProfile.png"
                    }
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[3rem] h-[3rem] border-2 border-green-500 "
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-[18px] font-semibold">
                    Give a Rating <span className="text-red-500">*</span>
                  </h3>
                  <div className="w-full flex gap-1 pb-3">
                    {[1, 2, 3, 4, 5].map((i: any) =>
                      rating >= i ? (
                        <AiFillStar
                          className=" mr-1 cursor-pointer text-yellow-500"
                          key={i}
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          className=" mr-1 cursor-pointer text-yellow-500"
                          key={i}
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    cols={40}
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your questions..."
                    className={`outline-none border bg-transparent dark:text-white text-black py-2 px-3 resize-none rounded-md shadow-md 800px:w-full text-[18px] w-[95%]`}
                  />
                  <div className="flex items-center justify-end mt-4">
                    <button
                      disabled={addReviewLoading}
                      className={`${
                        style.button
                      } flex items-center justify-center  !w-[7rem] ${
                        addReviewLoading ? "cursor-no-drop" : "cursor-pointer"
                      }  `}
                      onClick={addReviewLoading ? () => {} : handleReviewSubmit}
                    >
                      {addReviewLoading ? (
                        <BiLoaderAlt className="animate-spin h-5 w-5 text-white" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
          <div className="w-full h-[1px] bg-[#c3c0c03b] my-6"></div>
          <div className="w-full">
            {(
              courseData?.course?.reviews &&
              [...courseData?.course?.reviews].reverse()
            )?.map((item: any, index: any) => (
              <div className="w-full my-5" key={index}>
                <div className="w-full flex gap-2 ">
                  <div className="w-[43px] h-[43px]">
                    <div className="w-[40px] h-[40px] bg-sky-500  rounded-[50%] flex items-center justify-center cursor-pointer">
                      {item?.user?.avatar ? (
                        <Image
                          src={item?.user?.avatar?.url}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-full w-[2.5rem] h-[2.5rem]  "
                        />
                      ) : (
                        <h1 className="uppercase text-white font-[500] text-[19px]">
                          {item?.user?.name.slice(0, 1)}
                        </h1>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-normal sm:justify-between gap-1 sm:gap-4">
                      <div className="">
                        <h5 className="text-[18px] flex items-center gap-2">
                          {item?.user?.name}
                        </h5>
                        <Ratings rating={item?.rating} />
                        <p className="text-[14px]">{item?.comment}</p>
                      </div>
                      <small className=" text-gray-600 dark:text-gray-300 mt-1">
                        {format(item?.createdAt)} •
                      </small>
                    </div>
                    {/* Add Reply */}
                    {user.role === "admin" &&
                      item?.commentReplies.length === 0 && (
                        <div className="w-full flex items-center gap-4 mt-2">
                          <h4
                            className="font-semibold text-[17px] dark:text-gray-200 text-gray-700 cursor-pointer "
                            onClick={() => {
                              setReviewId(item._id);
                              setIsReviewReply(!isReviewReply);
                            }}
                          >
                            Add Reply
                          </h4>
                          <span
                            className=" flex items-center gap-1 mt-1 text-[18px] font-semibold"
                            onClick={() => {
                              setReviewId(item._id);
                              setIsReviewReply(!isReviewReply);
                            }}
                          >
                            <FaRegComment className="text-sky-500 cursor-pointer h-5 w-5" />{" "}
                            {item?.commentReplies.length}
                          </span>
                        </div>
                      )}
                    {/*Add Reply */}
                    {isReviewReply && reviewId === item?._id && (
                      <>
                        <div className=" flex flex-col gap-4">
                          <textarea
                            cols={40}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add your reply..."
                            className={`outline-none h-[3.5rem] border-b-2 message border-gray-400  bg-transparent dark:text-white text-black py-2 px-3 resize-none  800px:w-full text-[18px] w-[95%]`}
                          />
                          <div className="flex items-center justify-end ">
                            <button
                              disabled={isLoading}
                              className={`${
                                style.button
                              }  flex items-center justify-center !w-[6rem] ${
                                isLoading ? "cursor-no-drop" : "cursor-pointer"
                              }  `}
                              onClick={handleReviewReply}
                            >
                              {isLoading ? (
                                <BiLoaderAlt className="animate-spin h-5 w-5 text-white" />
                              ) : (
                                "Reply"
                              )}
                            </button>
                          </div>
                        </div>
                        {/* All Replies */}
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
                      </>
                    )}
                    {/*  */}
                    {item?.commentReplies.length !== 0 && (
                      <div
                        className={`${
                          user.role === "admin" && "hidden"
                        } w-full flex items-center gap-4 mt-2`}
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
                    {/*  */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
