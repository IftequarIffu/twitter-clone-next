'use client'
import React from 'react'
import { useRef, useState } from "react";
import useAutosizeTextArea from "./useAutosizeTextArea";
import axios from 'axios';



const TweetInputBox = () => {

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
        try {
          const payload = {
            post: tweet,
          };
          const response = await axios.post("/api/tweets", payload);
          console.log(response.data);
          window.location.reload();
          
        } catch (error) {
          console.log("Some Error occured");
          throw new Error("error");
        }
      };
    

  return (

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
  )
}

export default TweetInputBox