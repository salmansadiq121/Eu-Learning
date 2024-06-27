import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { style } from "../../../app/styles/style";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!").min(3),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfull";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    // eslint-disable-next-line
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div>
      <h1 className={`${style.title}`}>Join to EULearning</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3 mb-1">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={`${style.label}`}>
            Enter your Name
          </label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Full name"
            className={`${errors.name && touched.name && "border-red-600"} ${
              style.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 font-medium text-sm">
              {errors.name}
            </span>
          )}
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={`${style.label}`}>
            Enter your Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-600"} ${
              style.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 font-medium text-sm">
              {errors.email}
            </span>
          )}
        </div>
        {/* password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={`${style.label}`}>
            Enter your password
          </label>
          <div className="relative">
            {!show ? (
              <AiOutlineEyeInvisible
                size="20"
                className="dark:text-white text-black cursor-pointer absolute top-3 right-2 z-[2]"
                onClick={() => setShow(!show)}
              />
            ) : (
              <AiOutlineEye
                size="20"
                className="dark:text-white text-black cursor-pointer absolute top-3 right-2 z-[2]"
                onClick={() => setShow(!show)}
              />
            )}

            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-600"
              } ${style.input}`}
            />
            {errors.password && touched.password && (
              <span className="text-red-500 font-medium text-sm">
                {errors.password}
              </span>
            )}
          </div>
        </div>

        {/* Submit-btn */}
        <div className="w-full mt-1">
          <button className={`${style.button}`}>Register</button>
        </div>
        <div className="flex items-center gap-4 justify-center mt-1">
          <div className="w-[25%] h-[2px] bg-gray-600 dark:bg-zinc-200"></div>
          <h5 className="text-center text-black dark:text-white font-Poppins text-sm font-medium">
            or join with
          </h5>
          <div className="w-[25%] h-[2px] bg-gray-600 dark:bg-zinc-200"></div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-1">
          <FcGoogle
            size="30"
            className="cursor-pointer filter hover:drop-shadow-lg "
            onClick={() => signIn("google")}
          />

          <AiFillGithub
            size="30"
            className="cursor-pointer dark:text-white text-gray-900  filter hover:drop-shadow-lg"
            onClick={() => signIn("github")}
          />
        </div>
        {/* No account */}
        <div className="flex items-center justify-center mt-1 gap-2">
          <span className="text-base text-black dark:text-white">
            Already have an account?
          </span>
          <span
            className="text-lg font-medium text-blue-500 hover:text-purple-500 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
