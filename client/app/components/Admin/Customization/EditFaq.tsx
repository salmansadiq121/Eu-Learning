import toast from "react-hot-toast";
import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "../../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TbLoader2 } from "react-icons/tb";
import Loader from "../../../utils/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [updateLayout, { isLoading: updateLoading, isSuccess, error }] =
    useUpdateLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    //   eslint-disable-next-line
  }, [isSuccess, error]);

  const toggleQuestion = (id: number) => {
    setQuestions((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: number, value: any) => {
    setQuestions((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id: number, value: any) => {
    setQuestions((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFAQHandler = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleEdit = async () => {
    await updateLayout({
      type: "FAQ",
      faq: questions,
    });
  };

  return (
    <div className=" w-full min-h-screen text-black dark:text-white mt-[4rem] px-4 pb-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <h3 className="text-2xl font-[600] ">FAQ Edit</h3>
          <hr className="my-3 h-[1px] bg-gray-300" />

          <div className="flex items-center justify-center">
            <dl className="space-y-8 w-[100%] sm:w-[75%] ">
              {questions?.map((faq, i) => (
                <div
                  className={`${
                    faq._id !== questions[0]?._id && "border-t"
                  } border-gray-300 bg-gray-100 dark:bg-gray-800 dark:text-white px-2 py-2 rounded-md shadow-md hover:shadow-lg stroke-gray-200   `}
                  key={faq?._id}
                >
                  <dt className="text-lg ">
                    <button
                      className="flex items-center  text-black justify-between dark:text-white w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(faq._id)}
                    >
                      <input
                        type="text"
                        className={`w-full border-2 rounded-sm bg-transparent border-none dark:text-white border-gray-300  outline-none py-2 px-2 cursor-pointer `}
                        value={faq?.question}
                        onChange={(e) =>
                          handleQuestionChange(faq?._id, e.target.value)
                        }
                        placeholder="Add your questions..."
                      />
                      <span className="ml-6 flex-shrink-0">
                        {faq?.active ? (
                          <HiMinus className="w-6 h-6 cursor-pointer dark:text-white" />
                        ) : (
                          <HiPlus className="w-6 h-6 cursor-pointer dark:text-white" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {faq.active && (
                    <dd className="mt-2 mr-[1.5rem] border-t border-gray-300">
                      <textarea
                        className="w-full text-gray-800 min-h-[7rem] bg-transparent dark:text-white sm:h-[4rem] border-2 border-none resize-none border-gray-300   rounded-sm outline-none py-2 px-2 cursor-pointer "
                        value={faq?.answer}
                        onChange={(e) =>
                          handleAnswerChange(faq?._id, e.target.value)
                        }
                        placeholder="Add your answer..."
                      />
                      <span className="ml-10 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-black dark:text-white text-[18px] transition-all duration-150 hover:text-red-500 cursor-pointer"
                          onClick={() => {
                            setQuestions((prevFaq) =>
                              prevFaq.filter((item) => item?._id !== faq?._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
          <br />
          <br />
          <IoMdAddCircleOutline
            className=" text-[25px] cursor-pointer"
            onClick={newFAQHandler}
          />
          <div className="w-[98%] sm:w-[96%] flex items-center justify-end ">
            <div
              className="flex bg-[#42d383] items-center justify-center w-[7rem] h-[2.6rem] cursor-pointer rounded-3xl text-[16px] text-white hover:scale-[1.01] hover:shadow-2xl"
              onClick={handleEdit}
            >
              {updateLoading ? (
                <TbLoader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                "Update"
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFaq;
