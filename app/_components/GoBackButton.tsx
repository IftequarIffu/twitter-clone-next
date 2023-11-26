"use client";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div onClick={router.back} className="hover:cursor-pointer">
      <GoArrowLeft size={20} />
    </div>
  );
};

export default GoBackButton;
