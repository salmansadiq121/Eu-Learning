import { style } from "../../../styles/style";
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: any) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Category", {});
  const [categories, setCategories] = useState<any[]>([]);

  // Get Categories
  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleChangeFile = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-[2px] w-full">
          <label htmlFor="" className={`${style.label}`}>
            Course Name
          </label>
          <input
            type="text"
            placeholder="Course Name"
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            className={`${style.input}`}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-full">
          <label htmlFor="" className={`${style.label}`}>
            Course Description
          </label>
          <textarea
            placeholder="Write something amazing..."
            rows={6}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="name"
            className={`${style.input} !h-min resize-none`}
          />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-[2px]">
            <label htmlFor="" className={`${style.label}`}>
              Course Price
            </label>
            <input
              type="number"
              placeholder="$ 99"
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              className={`${style.input}`}
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <label htmlFor="" className={`${style.label}`}>
              Estimate Price (Optional)
            </label>
            <input
              type="number"
              placeholder="$ 120"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              className={`${style.input}`}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-[2px] w-full">
            <label htmlFor="" className={`${style.label}`}>
              Course Tags
            </label>
            <input
              type="text"
              placeholder="Mern , Next 14, Javascript , TypeScript, Tailwind css..."
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              className={`${style.input}`}
            />
          </div>
          <div className="flex flex-col gap-[2px] w-full">
            <label htmlFor="" className={`${style.label}`}>
              Course Category
            </label>
            <select
              value={courseInfo?.categories}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              id="level"
              className={`${style.input} dark:bg-gray-800`}
            >
              <option value="">Select Category</option>
              {categories &&
                categories?.map((category: any, index: any) => (
                  <>
                    <option value={category?.title} key={index}>
                      {category?.title}
                    </option>
                  </>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-[2px]">
            <label htmlFor="" className={`${style.label}`}>
              Course Level
            </label>
            <input
              type="text"
              placeholder="Beginner/Intermidiate/Expert"
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              className={`${style.input}`}
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <label htmlFor="" className={`${style.label}`}>
              Demo URL (Optional)
            </label>
            <input
              type="text"
              placeholder="http://"
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="url"
              className={`${style.input}`}
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="file"
            onChange={handleChangeFile}
          />
          <label
            htmlFor="file"
            className={`w-full relative min-h-[10vh] dark:border-gray-100  rounded-md overflow-hidden border-gray-900 p-3 flex items-center justify-center border ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrag={handleDrop}
          >
            {courseInfo?.thumbnail ? (
              <Image
                src={
                  courseInfo?.thumbnail?.url
                    ? courseInfo?.thumbnail?.url
                    : courseInfo?.thumbnail
                }
                alt="thumbnail"
                width={100}
                height={100}
                className="max-h-full w-full object-cover rounded-md"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag & Drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            // onClick={() => setActive(active + 1)}
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#288e86] transition duration-150 text-center text-[#fff] rounded mt-6 cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
