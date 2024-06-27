import React, { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { style } from "../../../app/styles/style";
import { useSelector } from "react-redux";
// import { useActivationMutation } from "../redux/features/auth/AuthApi";
import { useActivationMutation } from "./../../../redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type VarifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        toast.error(errorData.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
    // eslint-disable-next-line
  }, [isSuccess, error]);
  const [varifyNumber, setVarifyNumber] = useState<VarifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  // Varification
  const varificatonHandler = async () => {
    const verificationNumber = Object.values(varifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVarifyNumber = { ...varifyNumber, [index]: value };
    setVarifyNumber(newVarifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div className="w-full">
      <h1 className={`${style.title}`}>Verify Your Account</h1>
      <br />
      <div className="mt-2 w-full flex items-center justify-center">
        <div
          className={`w-[80px] h-[80px] rounded-full ${
            invalidError ? "bg-red-600 animate-pulse" : "bg-[#497DF2]"
          } flex items-center justify-center`}
        >
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      <br />
      <br />
      <div className=" m-auto flex items-center justify-center gap-5">
        {Object.keys(varifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-md flex items-center text-black dark:text-white justify-center text-[18px]  font-Poppins outline-none text-center ${
              invalidError
                ? " shake border-red-600"
                : "dark:border-white border-gray-900"
            }`}
            placeholder=""
            maxLength={1}
            value={varifyNumber[key as keyof VarifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${style.button}`} onClick={varificatonHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center font-[16px] text-black dark:text-white mt-2 font-Poppins">
        Go back to sign in?{" "}
        <span
          className="text-blue-500 hover:text-blue-600 cursor-pointer pl-2 font-semibold"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
