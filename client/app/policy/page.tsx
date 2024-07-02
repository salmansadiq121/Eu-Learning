"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="EULearning - Privacy Policy"
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
      {/*  */}
      <div className="min-h-screen m-auto w-[99%] sm:w-[85%] text-black dark:text-white">
        <div className="py-6 sm:px-2 px-4 flex flex-col text-justify ">
          <h1 className="text-center font-bold text-3xl sm:text-5xl w-full">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <h3 className="text-[20px] text-sky-600  font-semibold py-4  mt-6">
            • Introduction
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            Welcome to EULearning! EULearning (&quot;we&quot;, &quot;our&quot;,
            &quot;us&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website www.eulearning.com and
            use our services related to online courses, coding, learning, and
            more. Please read this privacy policy carefully. If you do not agree
            with the terms of this privacy policy, please do not access the
            site.
          </p>
          <h3 className="text-[20px] text-sky-600 font-semibold py-4">
            • Information We Collect
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            We may collect information about you in a variety of ways. The
            information we may collect on the site includes:
          </p>
          <h3 className="text-[20px] text-sky-600  font-semibold py-4">
            • Consent
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            By using our website, you are hereby deemed to be agreeing to our
            Privacy Policy and Terms.
          </p>
          <h3 className="text-[20px] text-sky-600  font-semibold py-4">
            • What information do we collect?
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            When we ask you to provide your personal information on the Website,
            you will be made clear as to why you are being asked to provide it.
            <br />
            If you contact us directly, we may collect additional information
            about you such as your name, email address, phone number, content of
            the communication and/or any attachments or other information you
            send us. When you open an account on our website, you are required
            to provide some personal information such as your name, email
            address, photo, mobile number, Discord username, address, etc.{" "}
            <br />
            In addition, we may subsequently request additional information on
            an as-needed basis with your permission. We do not share your
            information with anyone without your permission and maintain the
            confidentiality of information.
          </p>
          <h3 className="text-[20px] text-sky-600  font-semibold py-4">
            • Confidentiality of personal passwords
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            The password you are asked to enter to login when opening an account
            on our website is encrypted and stored securely in our database. As
            a result, we cannot see the original content of your password. So
            the privacy of your password is properly protected on our website.{" "}
            <br />
            Also, to protect the privacy of your password, please never share
            your password with anyone. If you think your password has been
            compromised by someone else, change your password from the website
            immediately. If you somehow fail to change the password, contact our
            support.
          </p>
          <h3 className="text-[20px] text-sky-600  font-semibold py-4">
            • Personal Data
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            Personally identifiable information, such as your name, shipping
            address, email address, and telephone number, and demographic
            information, such as your age, gender, hometown, and interests, that
            you voluntarily give to us when you register with the site or when
            you choose to participate in various activities related to the site,
            such as online chat and message boards. If you choose to share data
            about yourself via your profile, online chat, or other interactive
            areas of the site, please be advised that all data you disclose in
            these areas is public and your data will be accessible to anyone who
            accesses the site.
          </p>
          {/*  */}
          <h3 className="text-[20px] text-sky-600  font-semibold py-4">
            • Derivative Data
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            Information our servers automatically collect when you access the
            site, such as your IP address, your browser type, your operating
            system, your access times, and the pages you have viewed directly
            before and after accessing the site. If you are using our mobile
            application, this information may also include your device name and
            type, your operating system, your phone number, your country, and
            other interactions with the application and other users via server
            log files, as well as any other information you choose to provide.
          </p>
          {/*  */}
          <h3 className="text-[20px] text-sky-600 font-semibold py-4">
            • Security of Your Information
          </h3>
          <p className="text-[18px]  text-gray-800 dark:text-gray-200 w-full">
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse. Any
            information disclosed online is vulnerable to interception and
            misuse by unauthorized parties. Therefore, we cannot guarantee
            complete security if you provide personal information.
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
