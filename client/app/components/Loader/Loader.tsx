import React from "react";
import { TbLoader3 } from "react-icons/tb";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="">
        <TbLoader3 className="h-[48px] w-[48px] animate-spin text-sky-500 " />
      </div>
    </div>
  );
}
