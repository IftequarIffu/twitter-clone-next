// ReplyModal.tsx
'use client'
import React, { useState } from "react";
import axios from "axios";
import { createComment } from "../actions/comments";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string
}

const ReplyModal: React.FC<ReplyModalProps> = ({ isOpen, onClose, postId }) => {

  const [replytext, setReplyText] = useState("")
  
  const handleTextareaClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    // Stop the click event propagation to prevent the modal from closing
    event.stopPropagation();
  };

  const replyMethod = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    try {
      // const data = {
      //   comment: replytext
      // }
      // const response = await axios.post(`/api/tweets/${postId}/comments`, data)
      // console.log(response.data)
      // window.location.reload()
      await createComment(replytext, postId)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
    <div
      className={`absolute bg-zinc-900 opacity-95 inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen 4">
        <div className="absolute bg-black w-full max-w-md p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Reply</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <textarea
            className="w-full mt-4 bg-black text-white border p-2 rounded-md focus:outline-none overflow-y-auto focus:border-primary resize-none"
            rows={4}
            placeholder="Tweet your reply"
            value={replytext}
            onChange={(e) => setReplyText(e.target.value)}
            onClick={handleTextareaClick}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary" onClick={(e) => replyMethod(e)}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReplyModal;
