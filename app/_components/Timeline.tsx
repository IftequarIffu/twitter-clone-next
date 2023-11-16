import React from "react";

const Timeline = () => {
  return (
    <div className=" w-6/12 border-l border-r border-zinc-700 h-full min-h-screen ">
      {/* Top Home section */}
      <div className="font-bold p-5 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        Home
      </div>

      {/*  Make a new tweet section */}
      <div className="flex items-center">
        <div className="p-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
        </div>

        <div className="mt-6">
          <textarea
            cols={40}
            className="bg-transparent text-xl focus:border-none overflow-hidden focus:outline-none resize-none"
            placeholder="What is happening?!"
          />
        </div>
      </div>

      {/* Tweet button */}
      <div className="flex justify-end px-4 pt-2 pb-6 border-b border-zinc-700">
        <div className="bg-primary px-4 p-2 rounded-3xl hover:bg-opacity-70 hover:cursor-pointer">
          Tweet
        </div>
      </div>

      {/* List of tweets */}
      <div className="flex border-b border-zinc-700">
        <div className="p-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
        </div>

        <div className="">
          <div className="p-4 ps-2 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            suscipit adipisci, asperiores saepe iure placeat consectetur magni
            illum nulla ut assumenda obcaecati vel dolorum repudiandae odit in,
            dicta veritatis? Numquam quae quam facilis quibusdam, architecto
            deserunt modi! Doloribus perferendis quos dolores delectus adipisci,
            blanditiis facilis, eos consectetur pariatur rerum veritatis, ad ex
            laboriosam. Necessitatibus repudiandae maxime non vitae sunt
            commodi? Et perferendis accusantium assumenda unde ut atque animi
            odio minima consectetur dolore? Sint nisi, nihil doloremque expedita
            cumque reprehenderit quia, ab, provident a doloribus similique fugit
            maiores debitis. Hic ut minus incidunt suscipit ex fugit, quia earum
            accusamus et natus.
          </div>
        </div>
      </div>

      <div className="flex border-b border-zinc-700">
        <div className="p-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
        </div>

        <div className="">
          <div className="p-4 ps-2 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            suscipit adipisci, asperiores saepe iure placeat consectetur magni
            illum nulla ut assumenda obcaecati vel dolorum repudiandae odit in,
            dicta veritatis? Numquam quae quam facilis quibusdam, architecto
            deserunt modi! Doloribus perferendis quos dolores delectus adipisci,
            blanditiis facilis, eos consectetur pariatur rerum veritatis, ad ex
            laboriosam. Necessitatibus repudiandae maxime non vitae sunt
            commodi? Et perferendis accusantium assumenda unde ut atque animi
            odio minima consectetur dolore? Sint nisi, nihil doloremque expedita
            cumque reprehenderit quia, ab, provident a doloribus similique fugit
            maiores debitis. Hic ut minus incidunt suscipit ex fugit, quia earum
            accusamus et natus.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
