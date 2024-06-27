import { style } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangedHandler = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Password do not match!");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0 text-black dark:text-white">
      <h1 className="block text-[25px] 800px:text-[30px] font-[500] text-center pb-2 ">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangedHandler}
          className="flex flex-col items-center"
        >
          <div className="relative w-[100%] 800px:w-[60%] mt-5">
            <label className="">Enter your old password</label>
            <span
              className="absolute top-9 right-10"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <FaRegEye className="h-5 w-5 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5 cursor-pointer" />
              )}
            </span>
            <input
              type={show ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-900 bg-gray-50`}
              required
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[100%] 800px:w-[60%] mt-5">
            <label className="">Enter your new password</label>
            <span
              className="absolute top-9 right-10"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <FaRegEye className="h-5 w-5 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5 cursor-pointer" />
              )}
            </span>
            <input
              type={show ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-900 bg-gray-50`}
              required
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[100%] 800px:w-[60%] mt-5">
            <label className="">Enter your confirm password</label>
            <span
              className="absolute top-9 right-10"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <FaRegEye className="h-5 w-5 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5 cursor-pointer" />
              )}
            </span>
            <input
              type={show ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-4 800px:mb-0 dark:bg-gray-900 bg-gray-50`}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mr-[1.3rem] sm:mr-[2.2rem] mt-5 w-[100%] 800px:w-[60%]">
            <button
              type="submit"
              className={` w-[70%] 800px:w-[200px] h-[2.8rem] border border-[#37a39a] hover:bg-[#37a39a] transition duration-150 text-center dark:text-white text-black rounded-md cursor-pointer `}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
