"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import FAQ from "../components/FAQ/FAQ";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="EULearning - FAQ"
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
      <FAQ />
    </div>
  );
};

export default Page;
