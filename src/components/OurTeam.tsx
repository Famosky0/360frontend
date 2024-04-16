import React from "react";
import Image from "next/image";

// Components
import WhiteSpace from "@/components/WhiteSpace";

interface IOurTeam {
  id: number;
  image: string;
  name: string;
  desc: string;
}

const OurTeamArr: IOurTeam[] = [
  {
    id: 1,
    image: "shoot1.jpeg",
    name: "Tayo Ajayi",
    desc: "Position Hold",
  },
  {
    id: 2,
    image: "shoot1.jpeg",
    name: "Tayo Ajayi",
    desc: "Position Hold",
  },
  {
    id: 3,
    image: "shoot1.jpeg",
    name: "Tayo Ajayi",
    desc: "Position Hold",
  },
];

const OurTeam = () => {
  return (
    <div className="py-12">
      <WhiteSpace>
        <div className="w-full flex flex-col gap-12">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">
              <span className="text-primary">Our Team</span>
            </h1>

            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white opacity-65 normal_text"
            >
              Stroke style move clip arrow plugin thumbnail italic follower.
              Blur list team share blur horizontal. Vector arrow layout effect
              list. Duplicate flatten.
            </p>
          </div>
        </div>

        <div className="w-full h-full flex flex-wrap md:flex-nowrap mt-12 gap-x-12 gap-y-6 items-center">
          {OurTeamArr.map((data: IOurTeam) => {
            return (
              <div className="w-full flex flex-col gap-1" key={data.id}>
                <div className="rounded">
                  <Image
                    src={`/${data.image}`}
                    alt="wedding shoot"
                    width="100"
                    height="100"
                    className="w-full object-cover rounded h-[350px]"
                  />
                </div>
                <div className="text-white py-2 flex flex-col gap-1 items-center">
                  <p className="text-3xl text-primary"> {data.name} </p>
                  <p className="text-lg opacity-80 font-light"> {data.desc} </p>
                </div>
              </div>
            );
          })}
        </div>
      </WhiteSpace>
    </div>
  );
};

export default OurTeam;
