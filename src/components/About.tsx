import React from "react";
import Image from "next/image";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Pattern
import Shoot from "../../public/shoot1.jpeg";

const AboutUs = () => {
  return (
    <div className="md:py-12">
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">
              <span className="text-primary">About 360 Shotitz </span>
            </h1>

            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white opacity-65 normal_text"
            >
              We provide the best services and experience at 360 Shotitz, and
              only a few can be explained in the following categories
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[0.4fr_0.6fr] grid-cols-1 mt-12 gap-6">
          <div className="h-full w-full max-h-full max-w-full">
            <Image
              src={Shoot}
              alt="about us image"
              className="w-full object-cover rounded h-full min-h-[400px]"
            />
          </div>
          <div>
            <p
              className="text-sm normal_text opacity-95"
              style={{ lineHeight: 2 }}
            >
              We strive to offer the best photography and visual experience
              available in Nigeria by delivering the perfect combination of
              professionalism, quality, and innovation. Our company specializes
              in event photography, fashion shoots, drone services, visual
              creation, and many more, capturing the joy and essence of every
              occasion with a combination of a keen eye for detail and
              state-of-the-art equipment that leaves you pleased forever. Our
              well-trained team of professional photographers and videographers
              are engineered to immortalize your events into stunning visuals
              that last a lifetime. Our root in innovation and quality allows us
              to consistently produce captivating digital content that our
              customers absolutely fall in love with. We understand that your
              events are extremely important, so we offer friendly and quality
              services that go the extra mile to make your day a memorable one.
              We pride ourselves in our ability to satisfy our customers in
              every single event we handle.
              <br />
              <br />
              Having over 1206 satisfied customers across Nigeria, it is time to
              see you happy when browsing through your completed project. In the
              meantime, here are some of our concluded projects
            </p>

            <div className="w-full flex gap-12 my-4">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl text-primary">500+</h2>
                <p>Awards</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl text-primary">2000+</h2>
                <p>Happy client</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl text-primary">3</h2>
                <p>Work Experience </p>
              </div>
            </div>
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

export default AboutUs;
