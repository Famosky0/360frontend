"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PhotoAlbum from "react-photo-album";

// Components
import WhiteSpace from "@/components/WhiteSpace";
import NextJsImage from "./NextJsImage";
// import photos from "@/data/photos";

// Data
import { PortfolioArrayPictures } from "@/data/photos";

const Portfolio = () => {
  const [pictureArray, setPictureArray] = useState<any>(PortfolioArrayPictures);
  const [pictureCategory, setPictureCategory] = useState("all");

  const HandlePictureCategoryChange = (category: string) => {
    const mycategory = category.toLowerCase();
    setPictureCategory(mycategory);

    const FilteredImage = pictureArray.filter(
      (data: any) => data.category === mycategory
    );

    setPictureArray(FilteredImage);

    // if (mycategory === "all") {
    //   return setPictureArray(PortfolioArrayPictures);
    // }
  };

  return (
    <div className="md:py-12">
      <WhiteSpace>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full text-center flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold">
              <span className="text-primary">
                Portfolio
              </span>
            </h1>

            <p
              style={{ lineHeight: 1.7 }}
              className="text-lg font-normal text-white normal_text"
            >
              Behind the lens comes some of our amazing event photography and
              video content.
            </p>
          </div>
          <div className="w-full">
            <div className="w-full py-12">
              <ul className="w-full flex md:gap-12 gap-6 text-center justify-center items-center font-light">
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("all");
                  }}
                >
                  All
                </li>
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("wedding");
                  }}
                >
                  Wedding
                </li>
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("portraits");
                  }}
                >
                  Portraits
                </li>
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("family");
                  }}
                >
                  Family
                </li>
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("events");
                  }}
                >
                  Events
                </li>
                <li
                  className="text-xl opacity-80 cursor-pointer"
                  onClick={() => {
                    HandlePictureCategoryChange("corporate");
                  }}
                >
                  Corporate
                </li>
              </ul>
            </div>

            <PhotoAlbum
              layout="rows"
              photos={pictureArray}
              renderPhoto={NextJsImage}
              defaultContainerWidth={1200}
              sizes={{ size: "calc(100vw - 240px)" }}
            />
          </div>
        </div>
      </WhiteSpace>
    </div>
  );
};

export default Portfolio;
