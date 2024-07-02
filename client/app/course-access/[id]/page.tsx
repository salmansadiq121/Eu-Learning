"use client";
import Loader from "@/app/utils/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const router = useRouter();
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        router.push("/");
      }
      if (error) {
        router.push("/");
      }
    }
    // eslint-disable-next-line
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;
