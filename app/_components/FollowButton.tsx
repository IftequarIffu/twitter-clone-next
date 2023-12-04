"use client";
import React from "react";
import { follow, isUserFollowedByMe, unfollow } from "../actions/follow";




const FollowButton = ({ idToFollow, isUserFollowed }: { idToFollow: string, isUserFollowed: boolean }) => {

    const followOrUnfollowMethod = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        idToFollow: string
      ) => {
        e.preventDefault();
        if(!isUserFollowed)
            await follow(idToFollow);
        else
            await unfollow(idToFollow)
      };

    

  return (
    <button
      onClick={(e) => followOrUnfollowMethod(e, idToFollow)}
      className="bg-white text-black font-medium hover:bg-opacity-70 hover:cursor-pointer rounded-3xl py-1 px-4"
    >
      {isUserFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
