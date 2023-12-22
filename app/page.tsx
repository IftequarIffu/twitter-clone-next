// 'use client'
import { useState } from "react";
import React from "react";
import Timeline from "./_components/Timeline";
import LoginModal from "./_components/AuthModal";




const Home = () => {


  // const [isReplyModalOpen, setReplyModalOpen] = useState(true);

  // const handleOpenReplyModal = () => {
  //   setReplyModalOpen(true);
  // };  

  // const handleCloseReplyModal = () => {
  //   setReplyModalOpen(false);
  // };

  return (
    <Timeline />
    // <LoginModal
    //       isOpen={isReplyModalOpen}
    //       onClose={handleCloseReplyModal}
    // />
  );
};

export default Home;
