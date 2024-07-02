import Image from "next/image";
import React, { useState } from "react";
import { format } from "timeago.js";
import { FaRegComment } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { style } from "@/app/styles/style";
import { MdVerified } from "react-icons/md";

type Props = {
  data: any;
  activeVideo: number;
  answer: string;
  setAnswer: any;
  handleAnswerSubmit: any;
  user: any;
  setAnswerId: any;
  addAnswerLoading: any;
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
  addAnswerLoading,
}: Props) => {
  return (
    <>
      <div className="w-full my-4">
        {data[activeVideo]?.questions?.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            setAnswerId={setAnswerId}
            addAnswerLoading={addAnswerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
  addAnswerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const [repliesActive, setRepliesActive] = useState(false);
  const [questionId, setQuestionId] = useState("");

  return (
    <>
      <div className="my-0 ">
        <div className="flex mb-4">
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
          <div className="pl-3 w-full flex flex-col ">
            <div className="flex flex-col">
              <h5 className="text-[20px]">{item?.user?.name}</h5>
              <p className="text-[15px]">{item?.question}</p>
              <small className=" text-gray-600 dark:text-gray-300 mt-1">
                {format(item?.createdAt)} •
              </small>
            </div>
            {/* Add Answer */}
            <div className="w-full flex items-center gap-4 mt-2">
              <h4
                className="font-semibold text-[17px] dark:text-gray-200 text-gray-700 cursor-pointer "
                onClick={() => {
                  setAnswerId(item._id);
                  setQuestionId(item._id);
                  setReplyActive(!replyActive);
                }}
              >
                {!replyActive
                  ? item?.questionReplies.length !== 0
                    ? "All Replies"
                    : "Add Reply"
                  : "Hide Reply"}
              </h4>
              <span className=" flex items-center gap-1 text-[18px] font-semibold">
                <FaRegComment className="text-sky-500 cursor-pointer h-5 w-5" />{" "}
                {item?.questionReplies.length}
              </span>
            </div>

            {replyActive && questionId === item._id && (
              <>
                <div className="w-full mt-4">
                  <div className="w-full flex gap-3">
                    <div className="w-[46px] h-[46px]">
                      <div className="w-[46px] h-[46px] ">
                        <Image
                          src={
                            user?.avatar
                              ? user?.avatar?.url
                              : "/defaultProfile.png"
                          }
                          alt="Avatar"
                          width={45}
                          height={45}
                          className="rounded-full w-[2.7rem] h-[2.7rem] border-2 border-green-500 "
                        />
                      </div>
                    </div>
                    <textarea
                      cols={40}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Add your reply..."
                      className={`outline-none h-[3.5rem] border-b-2 message border-gray-400  bg-transparent dark:text-white text-black py-2 px-3 resize-none  800px:w-full text-[18px] w-[95%]`}
                    />
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <button
                      disabled={addAnswerLoading}
                      className={`${
                        style.button
                      }  flex items-center justify-center !w-[6rem] ${
                        addAnswerLoading ? "cursor-no-drop" : "cursor-pointer"
                      }  `}
                      onClick={handleAnswerSubmit}
                    >
                      {addAnswerLoading ? (
                        <BiLoaderAlt className="animate-spin h-5 w-5 text-white" />
                      ) : (
                        "Reply"
                      )}
                    </button>
                  </div>
                </div>
                {item?.questionReplies.length !== 0 && (
                  <span
                    className=" flex items-center gap-0 text-[16px] font-semibold cursor-pointer mt-[-.5rem] "
                    onClick={() => setRepliesActive(!repliesActive)}
                  >
                    <FaRegComment className="text-sky-500 cursor-pointer h-5 w-5" />
                    （{item?.questionReplies.length}）Replies
                  </span>
                )}
                {repliesActive && (
                  <>
                    {item?.questionReplies?.map((item: any) => (
                      <div className="flex gap-3 mt-3" key={item._id}>
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
                        <div className="flex flex-col">
                          <h5 className="text-[18px] flex items-center gap-2">
                            {item?.user?.name}
                            <span>
                              {item?.user?.role === "admin" && (
                                <MdVerified className="h-5 w-5 text-green-500" />
                              )}
                            </span>
                          </h5>
                          <p className="text-[14px]">{item?.answer}</p>
                          <small className=" text-gray-600 dark:text-gray-300 mt-1">
                            {format(item?.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentReply;
