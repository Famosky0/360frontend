"use client";

import React, { useState } from "react";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Pattern
import Wavy_pattern from "../../public/wheel_pattern.png";

interface IFAQS {
  id: number;
  question: string;
  answer: string;
}

const FAQS_Questions: IFAQS[] = [
  {
    id: 1,
    question: "Where are You Located?",
    answer:
      "We are situated in Lagos and Ilorin, Nigeria. We currently have two physical studios and still expanding to cover the whole of Nigeria and beyond",
  },
  {
    id: 2,
    question: "How Many Customers Have You Satisfied?",
    answer:
      "We have handled a total of 1302 customers with 1206 appreciating our efforts via word of mouth, email, WhatsApp messages, and text messages. Customer satisfaction is crucial to our existence",
  },
  {
    id: 3,
    question: "Are You Available to Travel?",
    answer:
      "We are open to handling events across Nigeria. For events outside our studio, we normally add a little fee that covers accommodation and transportation. ",
  },
  {
    id: 4,
    question: "What Events Do You Cover?",
    answer:
      "We are engineered to handle all events that need photography or visual outputs. We have handled birthdays, weddings, funerals, fashion shots, fundraisers, political engagements, school programs, and many more that require state-of-the-art equipment like cameras and drones.",
  },
  {
    id: 5,
    question: "What is Your Style?",
    answer:
      "Our mantra centres around your satisfaction. Every shot has your needs and requirements in mind, creating digital content that supersedes your expectations. We don’t appreciate an ok reaction. We love it when our digital deliveries make you smile, nod, scream, and leap with excitement. Importantly, the goal when we shoot is to portray your uniqueness and identity with our innovation. ",
  },
  {
    id: 6,
    question: "What is Your Fee?",
    answer:
      "We don’t have a specific fee. We charge based on your digital requirements, timeframe, location, and time of delivery. Send us a message via the “Book Now” so we can talk more about your project.",
  },
  {
    id: 7,
    question: "How Do I Book You?",
    answer:
      "You can call us at 080xxxxxxxx or message us at 360sgotitz@gmail.com (PLEASE INSERT THE RIGHT INFO). Alternatively, you can fill out the Contact Us form on the “Book Now” page on the homepage of this website",
  },
  {
    id: 8,
    question: "What is the Timespan for Booking?",
    answer:
      "It is always good to book us as soon as you have your event date. Our model is first come first serve, so notifying us as fast as possible will help you beat the ever-increasing competition that may also need our attention on the date of your event.",
  },
  {
    id: 9,
    question: "Do You Deliver Raw Photos?",
    answer:
      "We also deliver raw photos for a little extra fee. Our main focus is to present well-edited digital content that is catchy, blemish-free, and jaw-dropping. All digital deliveries are tailored to match your specifications, mood, and needs.",
  },
];

const FrequentlyAskedQuestions = () => {
  const [FAQIndex, setFAQIndex] = useState<number>(0);

  const FAQHandler = (id: number) => {
    setFAQIndex(id);
  };

  return (
    <div
      className="md:py-12"
      style={{
        background: `url(${Wavy_pattern.src}) 100px no-repeat`,
        backgroundPosition: "bottom right",
        backgroundSize: "300px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white opacity-65 normal_text"
            >
              Over time, these are the questions that are frequently asked by
              our users. Check it out, your question might have just been
              answered
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-20">
            <div className="w-full border border-white rounded-xl md:h-[320px]">
              <div className="w-[90%] mx-auto h-full bg-white border border-white rounded-xl md:min-h-[350px] -mt-20">
                <div className="w-full min-w-full max-w-full h-full min-h-full text-black grid grid-cols-1 md:grid-cols-2 divide-x divide-black">
                  <div className="w-full px-4 py-4 flex flex-col gap-3 md:overflow-y-scroll no-scrollbar">
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        FAQS
                      </h3>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      {FAQS_Questions.map((data: IFAQS, index) => {
                        return (
                          <div
                            key={data.id}
                            onClick={() => FAQHandler(index)}
                            className="w-full text-black bg-white border border-black transition-all hover:bg-black hover:text-white px-4 py-2 rounded-xl flex items-center gap-4 cursor-pointer"
                          >
                            <h2 className="text-4xl">✧</h2>
                            <p> {data.question} </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full px-4 py-4 flex flex-col gap-3">
                    <div>
                      <h3 className="text-center text-2xl font-semibold">
                        Answers
                      </h3>
                    </div>
                    <div className="w-full bg-black h-full text-white rounded-xl p-4 flex flex-col gap-3">
                      <h2 className="text-4xl">✧</h2>
                      <p className="text-sm text-center font-normal leading-6">
                        {`${FAQS_Questions[FAQIndex].answer} `}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

export default FrequentlyAskedQuestions;
