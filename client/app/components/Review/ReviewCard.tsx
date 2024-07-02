import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] dark:bg-slate-500 dark:bg-opacity-[0.20] bg-opacity-[.70] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-xl dark:shadow-inner ">
      <div className="flex w-full items-center gap-2">
        <div className="relative w-[55px] h-[55px]">
          <Image
            src={item?.avatar}
            width={52}
            height={52}
            objectFit="contain"
            className="rounded-full "
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] text-black dark:text-white ">
            {item?.name}
          </h3>
          <span className="text-[15px] text-black dark:text-white ">
            {item?.profession}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Ratings rating={item?.rating} />
        <p className="w-full text-[15px] text-gray-800 dark:text-gray-100">
          {item?.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
