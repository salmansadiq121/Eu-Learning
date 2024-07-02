import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find Unique Video Section
  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSection = new Set(visibleSections);
    if (newVisibleSection.has(section)) {
      newVisibleSection.delete(section);
    } else {
      newVisibleSection.add(section);
    }
    setVisibleSections(newVisibleSection);
  };
  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px]  sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections?.map((section: any, sectionIndex: any) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter Video By section
        const sectionVideos: any[] = data?.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length; //number of videos in the current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item?.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const sectionContentHours: number = sectionVideoLength / 60;
        console.log("sectiondata", sectionVideoLength, sectionContentHours);

        return (
          <div
            className={`${isDemo && "border-b border-[#ffffff8e] pb-2"}`}
            key={sectionIndex}
          >
            <div className="flex w-full items-center justify-between">
              {/* Render Video Section */}
              <h2 className="text-[22px] text-black dark:text-white">
                {section}
              </h2>
              <button
                className="mr-4 cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? (
                  <BiChevronUp size={20} />
                ) : (
                  <BiChevronDown size={20} />
                )}
              </button>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons .{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: any) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;

                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all duration-150 p-2`}
                      key={item._id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div className="">
                          <MdOutlineOndemandVideo
                            className="mr-2"
                            size={25}
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px inline-block break-words text-black dark:text-white">
                          {item?.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
