"use client";

import type React from "react";

import Image from "next/image";

interface ProfileSectionProps {
  name: string;
  title: string;
  image: string;
  bio: React.ReactNode;
}

export function ProfileSection({
  name,
  title,
  image,
  bio,
}: ProfileSectionProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] px-6 py-12 md:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image Container */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-md md:max-w-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="order-1 lg:order-2 flex flex-col gap-6 md:gap-8">
            {/* Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold italic text-yellow-500">
              {name}
            </h1>

            {/* Title */}
            <p className="text-lg md:text-xl italic text-white font-medium">
              {title}
            </p>

            {/* Bio */}
            <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-4">
              {bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
