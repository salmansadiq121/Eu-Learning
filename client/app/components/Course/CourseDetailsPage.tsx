import Loader from "../../utils/Loader";
import { useGetCoursesDetailsQuery } from "../../../redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Heading from "../../utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetail from "./CourseDetail";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: any;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetCoursesDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
    //eslint-disable-next-line
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.clientSecret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course.name + `-EULearning`}
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
          {/* Details */}
          {stripePromise && (
            <CourseDetail
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setOpen={setOpen}
              setRoute={setRoute}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
