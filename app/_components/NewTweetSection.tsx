'use client'
import React from 'react'
import axios from 'axios'
import useAutosizeTextArea from "./useAutosizeTextArea";
import { useRef, useState } from "react";
import { createPost } from '../actions/posts';
import { CiImageOn } from "react-icons/ci";
import { SingleImageDropzone } from './SingleImageDropzone';
import { useEdgeStore } from '../edgestore/edgestore';

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

      const [file, setFile] = useState<File>();
      const { edgestore } = useEdgeStore();

      // const fileInput = useRef<HTMLInputElement>(null);

      // const [selectedFile, setSelectedFile] = useState<File | null>(null);

      // const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      //     // handle validations and file processing here
      //     const file = e.target.files![0];
      //     if (file) {
      //         setSelectedFile(file);
      //     }
      // };

      // const handleClick = () => {
      //     fileInput.current!.click();
      // };


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
          <div className="flex justify-end items-center space-x-8 px-4 pt-2 pb-6 border-b border-zinc-700">
          <div className='flex'>
            {/* <span className='ms-20' onClick={handleClick}>
              <CiImageOn size={30} className="hover:text-primary hover:cursor-pointer " />
              <input type="file" ref={fileInput} onChange={(e) => handleFileInput} style={{ display: 'none' }} />
            </span> */}
            <SingleImageDropzone 
            width={60}
            height={60}
            value={file}
            onChange={(file) => {
              setFile(file);
          }}
          />
        </div>
            <div className="bg-primary px-4 p-2 rounded-3xl hover:bg-opacity-70 hover:cursor-pointer">
          <button onClick={(e) => createTweet(e)}>Tweet</button>
        </div>
      </div>
        </div>
        
      </div>
  )
}

export default NewTweetSection