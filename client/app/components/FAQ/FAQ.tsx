import { HiMinus, HiPlus } from "react-icons/hi";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: number) => {
    setQuestions((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  return (
    <div className="mt-8 w-full text-black dark:text-white py-4 px-2 sm:px-4 pb-8">
      <div className="w-full flex flex-col gap-4 items-center justify-center ">
        <h1 className="text-center font-bold text-3xl sm:text-5xl">
          Common <span className="text-gradient">FAQ</span>
        </h1>
        <p className="text-[18px] flex items-center gap-2  text-center">
          <span className="w-4 h-4 rounded-full bg-green-500 shadow"></span>{" "}
          Frequently asked questions
        </p>
      </div>
      <br /> <br />
      <div className="flex items-center justify-center">
        <dl className="space-y-8 w-[100%] sm:w-[75%] ">
          {questions?.map((faq, i) => (
            <div
              className={`${
                faq._id !== questions[0]?._id && "border-t"
              } border-gray-300  dark:text-white px-2 py-2 shadow-md hover:shadow-lg stroke-gray-200   `}
              key={faq?._id}
            >
              <dt className="text-lg ">
                <button
                  className="flex items-center  text-black justify-between dark:text-white w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(faq._id)}
                >
                  <span
                    className={`w-full border-2 rounded-sm bg-transparent border-none dark:text-white border-gray-300  outline-none py-2 px-2 cursor-pointer `}
                  >
                    {faq?.question}
                  </span>
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
                  <p className="w-full text-gray-800 min-h-[7rem] bg-transparent dark:text-white sm:h-[4rem] border-2 border-none resize-none border-gray-300   rounded-sm outline-none py-2 px-2 cursor-pointer ">
                    {faq?.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
