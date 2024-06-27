import { style } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, indexLink: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(indexLink, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        //   Use the last video section if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      handleCourseSubmit();
      setActive(active + 1);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: any) => {
          const showSectionInput =
            index === 0 ||
            item?.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817]  p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } text-black dark:text-white  outline-none bg-transparent font-Poppins cursor-pointer`}
                        value={item?.videoSection}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <BiSolidPencil className="text-black dark:text-white cursor-pointer" />
                    </div>
                  </>
                )}
                <div className="w-full flex items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="text-black dark:text-white w-full font-Poppins">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {/* Arrow Button for collapsed video content */}
                  <div className="flex items-center justify-end w-full">
                    <AiOutlineDelete
                      className={`text-red-500 hover:text-red-600 transition-all duration-150 text-[20px] mr-2  ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-black dark:text-white cursor-pointer"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate[180deg]"
                          : "rotate[0deg]",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3 flex flex-col gap-1">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${style.input}`}
                        value={item?.title}
                        // onChange={(e) => {
                        //   const updateData = [...courseContentData];
                        //   updateData[index].title = e.target.value;
                        //   setCourseContentData(updateData);
                        // }}
                        onChange={(e) => {
                          const updateData = courseContentData.map(
                            (item: any, i: any) =>
                              i === index
                                ? { ...item, title: e.target.value }
                                : item
                          );
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my-3 flex flex-col gap-1">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Url
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        className={`${style.input}`}
                        value={item?.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my-3 flex flex-col gap-1">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="50..."
                        className={`${style.input}`}
                        value={item?.videoLength}
                        onChange={(e) => {
                          // const updateData = [...courseContentData];
                          // updateData[index].videoLength = e.target.value;
                          const updateData = courseContentData.map(
                            (item: any, i: any) => {
                              return i === index
                                ? { ...item, videoLength: e.target.value }
                                : item;
                            }
                          );

                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my-3 flex flex-col gap-1">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Description..."
                        className={`${style.input} !h-min resize-none`}
                        value={item?.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: any) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between mb-2">
                          <label htmlFor="" className={`${style.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`text-red-500 hover:text-red-600 transition-all duration-150 text-[20px] mr-2 ${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            }`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            placeholder="Sourse Code... (Link title)"
                            className={`${style.input}`}
                            value={link?.title}
                            // onChange={(e) => {
                            //   const updateData = [...courseContentData];
                            //   updateData[index].links[linkIndex].title =
                            //     e.target.value;
                            //   setCourseContentData(updateData);
                            // }}
                            onChange={(e) => {
                              // Clone the entire course content data array
                              const updateData = [...courseContentData];

                              // Clone the specific course content object at the specified index
                              const courseContent = { ...updateData[index] };

                              // Clone the links array of the specific course content object
                              const links = [...courseContent.links];

                              // Clone the specific link object at the specified linkIndex
                              const link = { ...links[linkIndex] };

                              // Update the title of the cloned link object
                              link.title = e.target.value;

                              // Replace the link in the cloned links array
                              links[linkIndex] = link;

                              // Replace the links array in the cloned course content object
                              courseContent.links = links;

                              // Replace the course content object in the cloned course content data array
                              updateData[index] = courseContent;

                              // Update the state with the new array
                              setCourseContentData(updateData);
                            }}
                          />

                          <input
                            type="url"
                            placeholder="Sourse Code Url... (Link URL)"
                            className={`${style.input}`}
                            value={link?.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <br />
                    {/* Add Link Button */}
                    <div className="inline-block mb-4">
                      <p
                        className="text-black dark:text-white flex items-center text-[18px] cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* Add New Content */}
                {index === courseContentData.length - 1 && (
                  <div className="">
                    <p
                      className="text-black dark:text-white flex items-center text-[18px] cursor-pointer"
                      onClick={(w: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2 text-[20px]" /> Add
                      New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] text-black dark:text-white cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className=" w-full flex items-center justify-between gap-2">
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
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
