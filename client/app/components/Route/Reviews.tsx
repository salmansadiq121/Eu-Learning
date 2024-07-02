import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Students | Cambridge University",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
  },
  {
    name: "Gene Bates",
    rating: 4.5,
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1684043108/343413152_1280475219231832_196781321050527913_n_q0bge7.jpg",
    profession: "Students | Cambridge University",
    comment:
      "EULearning does a good job of explaining the concepts in a clear and concise way, and the examples are well-chosen. Overall, this is a valuable resource for anyone who is new to programming",
  },
  {
    name: "Gene Bates",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Students | Cambridge University",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
  },
  {
    name: "Gene Bates",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Students | Cambridge University",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
  },
  {
    name: "Ayat AlBqoor",
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1683766549/1667644613514_qd12it.jpg",
    profession:
      "Students | Cambridge UniversityWeb developer | Nafith Logistics International,Jordan",
    rating: 4,
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights!",
  },
  {
    name: "Achmad Syihabul Millah",

    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Junior Web Developer | Indonesia",
    rating: 5,
    comment:
      "Join EULearning! EULearning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend Becodemy to anyone looking to improve their programming skills and build practical projects. Becodemy is a great resource that will help you take your skills to the next level. ",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="mt-8 w-full text-black dark:text-white py-4 px-2 sm:px-4 pb-8">
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <div className="w-full flex flex-col gap-4 items-center justify-center ">
          <h1 className="text-center font-bold text-3xl sm:text-5xl">
            Student&rsquo;s <span className="text-gradient">Feedback</span>
          </h1>
          <p className="text-[18px] flex items-start sm:items-center gap-1 sm:gap-2 text-center">
            <span className="w-4 h-4 rounded-full bg-green-500 shadow mt-2 sm:mt-0 "></span>{" "}
            Let&rsquo;s have a look at our students reaction!
          </p>
        </div>
        <br /> <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1500px:grid-cols-4 gap-4">
          {reviews &&
            reviews.map((item: any, index: any) => (
              <ReviewCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
