import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Image
import Wavy_pattern from "../../public/wavy_pattern.png";

const Section = () => {
  return (
    <>
      <div
        className="md:py-12"
        style={{
          background: `url(${Wavy_pattern.src}) 100px no-repeat`,
          backgroundPosition: "left top",
          backgroundSize: "400px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <WhiteSpace>
          <div className="w-full flex flex-col gap-[150px]">
            <div className="w-full flex md:justify-between justify-center gap-[30px] font-[400] flex-wrap md:flex-nowrap items-start">
              <div className="md:h-[479px] h-auto md:w-auto w-full">
                <Image
                  width={1000}
                  height={1000}
                  src="/about2.jpg"
                  className="w-full h-full"
                  alt="shoot"
                />
              </div>
              <div className="w-full md:w-[50%] flex flex-col font-normal normal_text text-[18px] gap-[20px]">
                <h1 className=" leading-[57px] text-5xl font-semibold text-[#FF6B00]">
                  About Us
                </h1>
                <p className="text-justify leading-[30px]">
                  Beyond mere documentation, our photography transcends to the
                  realm of storytelling, where every shutter click captures a
                  narrative waiting to be unveiled. We imbue each frame with the
                  ambiance of the scene, ensuring that the lighting,
                  composition, and subject harmonize to create a captivating
                  visual experience. In the rapidly evolving landscape of
                  photography, we remain at the vanguard, continuously enriching
                  our repertoire with cutting-edge techniques and pioneering
                  services that set us apart. Our dedication to excellence is
                  unwavering, as we not only meet the expectations of our
                  clients but strive to exceed them, establishing new benchmarks
                  of quality in the Nigerian photography industry.
                </p>
                <Link href="/about">
                  <button className="py-3 px-6 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
                    Read More
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full flex reverse justify-between md:flex-wrap gap-[30px] flex-wrap md:flex-nowrap font-[400] items-center">
              <div className="md:w-[50%] w-full flex flex-col text-[18px] font-normal normal_text gap-[20px]">
                <div className=" leading-[57px] text-4xl font-semibold text-[#FF6B00]">
                  <h1 className="solid">We don’t sell camerawork, </h1>
                  <h1>We sell innovation</h1>
                </div>
                <p className="text-justify leading-[30px]">
                  Innovation and quality delivery are what set us apart. With
                  over a decade of experience in event photography and visual
                  creation, we’ve established a process that brings unmatched
                  clarity to your content. Firstly, we listen keenly to your
                  needs. Then we refine and distill your important messages
                  prior to taking any shot. Finally, our experienced
                  photographers and content creators bring your message to life
                  with incredible shots, unmatched editing skills, and
                  state-of-the-art presentation. We bring your imagination to
                  life.
                </p>
                <Link href="/about">
                  <button className="py-3 px-6 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="md:h-[479px] h-auto md:w-auto w-full">
                <Image
                  width={1000}
                  height={1000}
                  src="/innovation2.jpg"
                  className="w-full h-full"
                  alt="shoot"
                />
              </div>
            </div>
          </div>
        </WhiteSpace>
      </div>
    </>
  );
};

export default Section;
