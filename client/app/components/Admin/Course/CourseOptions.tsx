import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options?.map((option: any, index: any) => (
        <div className="w-full py-5 flex" key={index}>
          <div
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
            onClick={() => setActive(index)}
          >
            <IoMdCheckmark className="text-[20px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute w-1 h-[30px] ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              ></div>
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[17px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
