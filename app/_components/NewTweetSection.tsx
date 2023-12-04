'use client'
import React from 'react'
import axios from 'axios'
import useAutosizeTextArea from "./useAutosizeTextArea";
import { useRef, useState } from "react";
import { createPost } from '../actions/posts';



const NewTweetSection = () => {


    const [tweet, setTweet] = useState("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, tweet);


    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
    
        setTweet(val);
      };


      const createTweet = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        const newPost = await createPost(tweet)
        setTweet("")
      };


  return (
    <div className="">
        <div className="flex">
          <div className="p-4 mt-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
          </div>

          {/* <TweetInputBox /> */}
          <div className="mt-6">
          <textarea
            cols={40}
            rows={1}
            ref={textAreaRef}
            value={tweet}
            onChange={handleChange}
            className="bg-transparent text-xl focus:border-none overflow-hidden focus:outline-none resize-none"
            placeholder="What is happening?!"
          />
        </div>
        </div>
        
        {/* Create Tweet Input Text Area */}
        <div className="">
          {/* <CreateTweetButton createTweet={createTweet} /> */}
          <div className="flex justify-end px-4 pt-2 pb-6 border-b border-zinc-700">
            <div className="bg-primary px-4 p-2 rounded-3xl hover:bg-opacity-70 hover:cursor-pointer">
          <button onClick={(e) => createTweet(e)}>Tweet</button>
        </div>
      </div>
        </div>
        
      </div>
  )
}

export default NewTweetSection