import { style } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user?.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    console.log("User1:", user?.name);
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile updated successfully!");
    }
    if (error || updateError) {
      console.log(error || updateAvatar);
    }
    //eslint-disable-next-line
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (name !== "") {
        await editProfile({ name: name });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <div className="text-black dark:text-white w-full flex justify-center">
        <div className="relative w-[5rem] h-[5rem] sm:w-[7rem] sm:h-[7rem] rounded-full overflow-hidden cursor-pointer border-2 border-[#37a39a] ">
          <Image
            src={avatar ? avatar : "/defaultProfile.png"}
            alt="Avatar"
            fill
            className=""
          />
          <input
            type="file"
            id="avatar"
            onChange={imageHandler}
            className="hidden"
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] rounded-full bg-slate-900 absolute bottom-[.8rem] right-2 cursor-pointer flex items-center justify-center ">
              <AiOutlineCamera size={20} className="z-1 text-white" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4 ">
            <div className="w-[100%] mb-5">
              <label className="block pb-2 text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className={`w-full ${style.input} !w-[95%] mb-1 800px:mb-0 `}
              />
            </div>
            <div className="w-[100%]">
              <label className="block pb-2 text-black dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                value={user?.email}
                readOnly
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Email"
                className={`w-full ${style.input} !w-[95%] mb-1 800px:mb-0 `}
              />
            </div>
            <div className=" mt-8 flex items-center justify-end pr-6 ">
              <button
                type="submit"
                className={` w-full 800px:w-[200px] h-[2.8rem] border border-[#37a39a] hover:bg-[#37a39a] transition duration-150 text-center dark:text-white text-black rounded-md cursor-pointer `}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
