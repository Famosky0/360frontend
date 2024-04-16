import React from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import WhiteSpace from "@/components/WhiteSpace";

// Image
import Wavy_pattern from "../../public/wavy_pattern.png";

interface ICtx {
  id: number;
  image: string;
  text: string;
}

const CTX: ICtx[] = [
  {
    id: 1,
    image: "best1.jpg",
    text: "Best Background",
  },
  {
    id: 2,
    image: "best2.jpg",
    text: "Best Camera's",
  },
  {
    id: 3,
    image: "best3.jpg",
    text: "Best Editor's",
  },
];

const PhotographCTX = () => {
  return (
    // <div
    //   className="md:py-12"
    //   style={{
    //     background: `url(${Wavy_pattern.src}) 100px no-repeat`,
    //     backgroundPosition: "left top",
    //     backgroundSize: "400px",
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
      
    // </div>
    <WhiteSpace>
    <div className="w-full flex flex-col gap-12">
      <div className="w-full text-center flex flex-col gap-4">
        <h1 style={{ lineHeight: 1.5 }} className="text-4xl font-bold">
          <span className="text-primary"> &apos;&apos; A Photograph</span>
          is often viewed, rarely deeply observed. &apos;&apos;
        </h1>

        <p
          style={{ lineHeight: 1.7 }}
          className="text-lg font-normal text-justify text-white normal_text"
        >
          Our goal is not only to capture a moment in time but to
          encapsulate the emotions and the story that weaves through every
          pixel. The same principle applies to videography—each shot from us
          is meticulously framed, ensuring that the movement and flow
          contribute to a cohesive story that will engage and resonate with
          the audience. In drone photography, the unique aerial perspective
          we provide offers a grand scale and context to the narrative,
          adding an unparalleled dimension to the visual storytelling.
          Whether it&apos;s the subtle interplay of light and shadow in a photo
          or the sweeping grandeur of a drone-shot landscape, my work is
          about diving into the depths of what the eye can see and bringing
          forth what only the heart can perceive.
        </p>
      </div>
      <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-x-12 gap-y-6 items-center">
        {CTX.map((data: ICtx) => {
          return (
            <div className="w-full flex flex-col gap-1" key={data.id}>
              <div className="rounded">
                <Image
                  src={`/${data.image}`}
                  alt="wedding shoot"
                  width={1000}
                  height={1000}
                  className="w-full object-cover rounded h-[350px]"
                />
              </div>
              {/* <div className="text-white py-2 flex justify-between gap-4">
                <p className="text-lg"> {data.text} </p>
              </div> */}
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href="/about">
          <button className="py-3 px-6 shadow inline-flex bg-[var(--primary-color)] hover:text-main justify-center items-center gap-2 rounded-full font-medium text-white align-middle transition-all text-md">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  </WhiteSpace>
  );
};

export default PhotographCTX;
