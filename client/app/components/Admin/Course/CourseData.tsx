import { style } from "@/app/styles/style";
import { AddCircleOutline } from "@mui/icons-material";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    // const updateBenefits = [...benefits];
    // updateBenefits[index].title = value;
    const updateBenefits = benefits.map((benefit, i) =>
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updateBenefits);
  };

  const handleAddbenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    // const updatPrerequisites = [...prerequisites];
    // updatPrerequisites[index].title = value;
    const updatPrerequisites = prerequisites.map((prerequisites, i) =>
      i === index ? { ...prerequisites, title: value } : prerequisites
    );
    setPrerequisites(updatPrerequisites);
  };
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1].title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div className="">
        <h3 className="text-xl font-semibold ">Benefites</h3>
        <label className={`${style.label} text-[16px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: any) => (
          <input
            type="text"
            key={index}
            name="benefits"
            required
            placeholder="You will be able to build a full Stack application..."
            value={benefit?.title}
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
            className={`${style.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddbenefits}
        />
      </div>
      <div className="">
        <h3 className="text-xl font-semibold ">Prerequisites</h3>
        <label className={`${style.label} text-[16px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />

        {prerequisites.map((prerequisite: any, index: any) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            required
            placeholder="You need basic knowledge on MERN Stack."
            value={prerequisite?.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            className={`${style.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
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
          onClick={handleOptions}
          className="w-full 800px:w-[100px] h-[40px] bg-[#37a39a] hover:bg-[#288e86] transition duration-150 text-center text-[#fff] rounded mt-6 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
