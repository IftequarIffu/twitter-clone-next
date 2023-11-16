
import React from "react";
import LeftBar from "./_components/LeftBar";
import Timeline from "./_components/Timeline";
import RightBar from "./_components/RightBar";



const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-screen-xl w-full h-full  flex">
        {/* Left Bar */}
        <LeftBar />

        <Timeline />

        <RightBar />
        {/* <div>Middle Timeline</div>
        
        
        <div>Right bar</div> */}
      </div>
    </div>
  );
};

export default Home;
