"use client";

import Image from "next/image";
import SocialMediaIcon from "./SocialMediaIcon";
import MenuInCard from "./MenuInCard";
import { useState } from "react";

export default function CardPreview({
  backgroundColor,
  username,
  description,
  profileImage,
  bannerImage,
  menu,
  socialMedia,
  usernameTextColor = "#E44B37",
  descriptionTextColor = "#67748e",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - e.currentTarget.offsetTop);
    setScrollTop(e.currentTarget.scrollTop);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseLeave = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const moveY = e.pageY - startY;
    e.currentTarget.scrollTop = scrollTop - moveY;
  };
  return (
    <div
      className={`w-[320px] h-[640px] rounded-3xl relative overflow-hidden select-none backdrop-blur-sm shadow-xl`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div className="flex justify-center">
        {/* Banner Section */}
        <div className="absolute top-0 left-0 w-full flex justify-center ">
          {bannerImage ? (
            <Image
              src={bannerImage}
              alt="Profile Banner"
              className="w-[900px] h-[150px] object-cover"
              width={900}
              height={150}
            />
          ) : (
            <div className="w-[900px] h-[150px] bg-gray-900"></div>
          )}
        </div>
        {/* Banner Section End */}

        <div className="flex flex-col items-center w-full">
          {/* Image Profile Section */}
          <div className="pt-[100px] flex justify-center items-center">
            {/* Profile Image */}
            {profileImage ? (
              <Image
                className="w-[90px] h-[90px] rounded-full z-10"
                src={profileImage}
                alt="Profile Avatar"
                width={90}
                height={90}
              />
            ) : (
              <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
                <svg
                  className="w-[50px] h-[50px] text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            )}
          </div>
          {/* Image Profile Section End */}

          {/* Username Section */}
          <div className="flex flex-wrap justify-center max-w-full">
            <span
              className="text-center mt-4  font-semibold px-2 text-xl break-words max-w-full"
              style={{
                color: usernameTextColor,
              }}
            >
              {username}
            </span>
          </div>
          {/* Username Section End */}

          {/* Description Section */}
          <div className="flex flex-wrap justify-center max-w-full">
            <span
              className="text-center mt-4 text-sm px-2 font-normal break-words max-w-full"
              style={{
                color: descriptionTextColor,
              }}
            >
              {description}
            </span>
          </div>
          {/* Description Section End */}

          {/* Social Media Section */}
          <div className="mt-4 flex gap-[10px]">
            {socialMedia.map((item, index) => (
              <SocialMediaIcon
                key={index}
                platform={item.platform}
                href={item.href}
              />
            ))}
          </div>
          {/* Social Media Section End */}

          {/* Menu Section */}
          <div className="mt-8 flex flex-col gap-[10px] w-full px-[20px]">
            {menu.map((item, index) => (
              <MenuInCard
                key={index}
                label={item.label}
                href={item.href}
                bgColor={item.backgroundColor}
                textColor={item.textColor}
              />
            ))}
          </div>
          {/* Menu Section End */}

          {/* Footer Section */}
          <span className="text-center mt-6 text-[#67748e] text-sm px-2 font-normal">
            Made with
            <span className="text-[#E44B37] font-semibold"> Cardyfile</span>
          </span>
          {/* Footer Section End */}
        </div>
      </div>
    </div>
  );
}
