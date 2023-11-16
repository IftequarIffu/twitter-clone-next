import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const RightBar = () => {
  function formatNumber(number: number) {
    if (number < 1000) {
      return number.toString(); // Return as is if less than 1000
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + "K"; // Convert to K format
    } else {
      return (number / 1000000).toFixed(1) + "M"; // Convert to M format
    }
  }

  const trendingPosts = [
    {
      trendingCountry: "India",
      hashtag: "GameChanger",
      totalPosts: 22376,
    },
    {
      trendingCountry: "India",
      hashtag: "INDvsENG",
      totalPosts: 7890376,
    },
    {
      trendingCountry: "India",
      hashtag: "Happy Birthday SRK",
      totalPosts: 390376,
    },
  ];

  const userDetails = [
    {
      username: "johntweets",
      name: "JohnSmith",
    },
    {
      username: "urstrulymahesh",
      name: "MaheshBabu",
    },
    {
      username: "iamsrk",
      name: "ShahRukhKhan",
    },
  ];

  return (
    <div className=" w-4/12 p-4 px-6 flex flex-col h-screen min-h-full space-y-4 sticky top-0">
      {/* Search bar */}
      <div className="flex items-center space-x-2 bg-zinc-900 px-4 py-2 rounded-3xl">
        <div>
          <AiOutlineSearch />
        </div>
        <div>
          <input
            className="bg-transparent focus:border-none focus:outline-none"
            placeholder="Search"
          />
        </div>
      </div>

      {/* What's happening */}
      <div className="flex flex-col space-y-2 bg-zinc-900  rounded-3xl">
        <h1 className="font-semibold px-4 pt-3 text-xl">
          What&apos;s happening
        </h1>

        {trendingPosts.map((post) => (
          <div
            key={post.hashtag}
            className="hover:bg-zinc-700 hover:cursor-pointer px-4 py-2 rounded-3xl pb-6"
          >
            <p className="font-thin text-xs text-zinc-300">
              Trending in {post.trendingCountry}
            </p>
            <h1>#{post.hashtag}</h1>
            <p className="font-thin text-xs text-zinc-300">
              {formatNumber(post.totalPosts)} posts
            </p>
          </div>
        ))}
      </div>

      {/* Who to Follow */}
      <div className="flex flex-col  space-y-3  bg-zinc-900  rounded-3xl">
        <h1 className="font-semibold px-4 pt-3 text-xl mt-1">Who to Follow</h1>

        {userDetails.map((user) => (
          <div
            key={user.username}
            className="flex items-center px-4 py-3 rounded-3xl justify-between space-x-2 hover:bg-zinc-700 hover:cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <div className="">
                <RxAvatar size={38} />
              </div>
              <div className="flex-col items-center">
                <h1 className="">{user.username}</h1>
                <p className="font-thin text-sm text-zinc-300 tracking-wider">
                  @{user.name}
                </p>
              </div>
            </div>
            {/* Follow Button */}
            <div className="flex justify-end">
              <div className="bg-white text-black font-medium hover:bg-opacity-70 hover:cursor-pointer rounded-3xl py-1 px-4">
                Follow
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBar;
