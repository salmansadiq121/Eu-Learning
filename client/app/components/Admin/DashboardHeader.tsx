"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from "@/redux/features/notification/notification";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const {
    data,
    refetch,
    isLoading: isQueryLoading,
  } = useGetAllNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotification, { isSuccess }] = useUpdateNotificationMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(new Audio("/level-up-191997.mp3"));

  useEffect(() => {
    if (isSuccess) {
      refetch();
      notificationPlayer();
    }
    audio.load();
    // eslint-disable-next-line
  }, [isSuccess]);

  const notificationPlayer = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data?.notification?.filter((item: any) => item.status === "unread")
      );
    }
    audio.load();
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    const handleNewNotification = (data: any) => {
      notificationPlayer();
      if (!isQueryLoading && refetch) {
        refetch();
      }
    };

    socketId.on("newNotification", handleNewNotification);

    return () => {
      socketId.off("newNotification", handleNewNotification);
    };

    // eslint-disable-next-line
  }, [socketId, refetch, isQueryLoading]);

  // useEffect(() => {
  //   socketId.on("newNotification", (data) => {
  //     notificationPlayer();
  //     refetch();
  //   });
  //   // eslint-disable-next-line
  // }, []);

  const updateNotificationData = async (id: any) => {
    await updateNotification(id);
  };
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-1 z-[999] right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl container text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] text-white flex items-center justify-center ">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] min-h-[40vh] max-h-[60vh]  overflow-y-scroll  pb-2 shadow-xl dark:bg-[#111C43] bg-gray-100 absolute z-10 top-16 rounded">
          <h5 className="text-[20px] text-center font-medium text-black dark:text-white p-3 font-Poppins">
            Notifications
          </h5>
          {notifications &&
            notifications?.map((item: any, index: any) => (
              <div
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#fff]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item?.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => updateNotificationData(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="p-2 text-gray-700 dark:text-white text-[14px]">
                  {item?.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px] ">
                  {format(item?.createdAt)}
                </p>
              </div>
            ))}
          {notifications.length === 0 && (
            <div className="w-full h-[30vh] text-black   dark:text-white flex items-center justify-center">
              Notification not received!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
