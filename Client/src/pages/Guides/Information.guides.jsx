import React, { useState } from "react";
import plantgif from "../../assets/naturegif.gif";
import initialDetails from "./qa.json";
import{Link} from "react-router-dom"

const plantGif = {
  position: "absolute",
  top: "63%",
  right: "72%",
  width: "300px",
};

const InformationGuides = () => {
  const sectionSeparatorStyle = {
    borderBottom: "6px solid #f6f6f6f6 ",
  };

  return (
    <div className="w-full bg-white">
      <hr style={sectionSeparatorStyle} />

      <div className="max-w-[1480px] m-auto">
        <div className="text-center pt-20">
          <h1 className="text-4xl mx-auto leading-normal font-bold">
            Plant Care FAQs: Common Care Concerns
          </h1>
          <p className="mt-4 text-gray-400">
            Your Green Companion: Answers and Guidance in the World of Plants
          </p>
        </div>
      </div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {initialDetails.map((detail) => (
              <Detail key={detail.id} detail={detail} />
            ))}
          </div>
          <div className="text-center w-1/2 mx-auto pt-20">
            <p className="mt-4 text-gray-600 pt-14">
              We hope this section has been valuable for the care and
              maintenance of your plants. If you have any questions or need
              further assistance, please don't hesitate to reach out to us. Your
              plant's well-being is our priority ❤️
            </p>
          </div>
          <div className="mt-14 text-center">
            <p className="mt-4 px-4 leading-relaxed text-gray-700"></p>
            <Link
              to="/contact-us"
              className="inline-block rounded bg-green-600 px-12 py-3 mb-30 text-[14px] font-medium text-white transition hover-bg-green-500 focus-outline-none focus-ring focus-ring-yellow-400"
            >
              Have questions or need guidance? Contact Us 🌱
            </Link>
          </div>
          <img src={plantgif} alt="Butterfly" style={plantGif} />
        </div>
      </section>
    </div>
  );
};

const Detail = ({ detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetail = () => {
    setIsOpen(!isOpen);
  };

  return (
    <details
      className={`group ${
        isOpen ? "" : "[&_summary::-webkit-details-marker]:hidden"
      }`}
      onClick={toggleDetail}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
        <h2 className="font-medium">{detail.question}</h2>
        <svg
          className={`h-5 w-5 shrink-0 transition duration-300 ${
            isOpen ? "group-open:-rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <p className="mt-4 px-4 leading-relaxed text-gray-700">{detail.answer}</p>
    </details>
  );
};

export default InformationGuides;
