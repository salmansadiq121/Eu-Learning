"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="EULearning - About"
        description="EULearning is a plateform for students to learn and get help from teachers"
        keywords="EULearning, MERN, SASS,Redux, Context API, education, learning, programming, JavaScript, React, Node, Express, MongoDB, MySQL, Next JS, TypeScript, HTML, CSS , Prisma , Projects"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      {/* ------------------About Content--------- */}
      <div className="min-h-screen m-auto w-[99%] sm:w-[85%] text-black dark:text-white">
        <div className="py-6 sm:px-2 px-4 flex flex-col text-justify ">
          <h1 className="text-center font-bold text-3xl sm:text-5xl w-full">
            About <span className="text-gradient">EULearning</span>
          </h1>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full mt-8">
            Welcome to EU Learning, your premier destination for online
            education and personal growth. Our platform is designed to cater to
            learners of all ages, backgrounds, and skill levels, providing a
            comprehensive range of courses that span various subjects, from
            coding and technology to personal development and more. At EU
            Learning, we believe that education is a lifelong journey, and we
            are committed to making high-quality learning accessible to
            everyone, everywhere.
          </p>
          <h3 className="text-[20px] font-semibold py-4">Our Mission</h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            Our mission is to empower individuals through education. We aim to
            break down barriers to learning by offering flexible, affordable,
            and engaging courses that can be accessed from anywhere in the
            world. Whether you&rsquo;re looking to advance your career, learn a
            new skill, or explore a new hobby, EU Learning has something for
            you.
          </p>
          <h3 className="text-[20px] font-semibold py-4">What We Offer</h3>
          <h4 className="text-[19px] font-semibold py-4">
            1. Diverse Course Catalog
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              <span className="font-medium">Technology and Coding:</span> Master
              the latest programming languages, delve into data science, explore
              web development, and much more. Our coding courses are designed to
              equip you with the skills needed to thrive in today’s digital
              economy.
            </li>
            <li className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
              <span className="font-medium">Personal Development:</span> Enhance
              your soft skills, such as communication, leadership, and time
              management, with our specially curated personal development
              courses.
            </li>
            <li className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
              <span className="font-medium"> Creative Arts and Design:</span>{" "}
              Unleash your creativity with courses in graphic design,
              photography, music production, and other creative fields.
            </li>
            <li className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
              <span className="font-medium">
                Business and Entrepreneurship:
              </span>{" "}
              Learn the essentials of business management, marketing, finance,
              and entrepreneurship to kickstart or elevate your business
              ventures.
            </li>
            <li className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
              <span className="font-medium">Language Learning:</span> Expand
              your linguistic capabilities with courses in various languages,
              tailored for beginners to advanced learners.
            </li>
          </ul>
          <h4 className="text-[19px] font-semibold py-4">
            2. Expert Instructors
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              Our courses are created and taught by industry experts and
              experienced educators who bring real-world knowledge and practical
              insights to the virtual classroom. Each instructor is dedicated to
              helping you achieve your learning goals through high-quality
              content and interactive teaching methods.
            </li>
          </ul>
          {/*  */}
          <h4 className="text-[19px] font-semibold py-4">
            3. Interactive Learning Experience
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              We believe that learning should be engaging and interactive. Our
              platform features a variety of multimedia resources, including
              video lectures, interactive quizzes, practical projects, and peer
              discussions. This approach ensures that you not only gain
              theoretical knowledge but also practical skills that you can apply
              immediately.
            </li>
          </ul>
          {/*  */}
          <h4 className="text-[19px] font-semibold py-4">
            4. Flexible Learning Options
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              At EU Learning, we understand that everyone has different
              schedules and learning preferences. That’s why we offer flexible
              learning options, allowing you to learn at your own pace and on
              your own time. Whether you prefer to study intensively or take
              your time, our platform accommodates your needs.
            </li>
          </ul>
          {/*  */}
          <h4 className="text-[19px] font-semibold py-4">
            5. Community and Support
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              Join a vibrant community of learners from around the globe.
              Connect with peers, share knowledge, and collaborate on projects
              through our discussion forums and group activities. Additionally,
              our dedicated support team is always available to assist you with
              any questions or challenges you may encounter.
            </li>
          </ul>
          {/*  */}
          <h4 className="text-[19px] font-semibold py-4">
            5. Certification and Career Advancement
          </h4>
          <ul className="list-disc flex flex-col gap-1 ml-[2rem]">
            <li className="text-[18px]   text-gray-800 dark:text-gray-200 w-full">
              Upon completion of our courses, you will receive a certificate
              that validates your new skills and knowledge. These certificates
              can be shared with employers and added to your professional
              portfolio, helping you advance in your career or switch to a new
              field.
            </li>
          </ul>
          <h3 className="text-[20px] font-semibold py-4">Our Vision</h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full mt-8">
            We envision a world where education is universally accessible and
            where individuals have the opportunity to learn and grow without
            limitations. By leveraging the power of technology, we strive to
            create an inclusive and innovative learning environment that fosters
            continuous growth and development.
          </p>
          <h3 className="text-[20px] font-semibold py-4">Join Us Today</h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full mt-8">
            Embark on your learning journey with EU Learning and discover a
            world of opportunities. Whether you&rsquo;re aiming to upskill,
            reskill, or simply explore new interests, we are here to support you
            every step of the way. Join our community of learners and start
            transforming your future today.
          </p>
          {/*  */}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
