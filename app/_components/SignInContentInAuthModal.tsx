// LoginModal.tsx
'use client'
import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { signIn } from "next-auth/react"

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  setScreen: (screenType: string) => void;
}

const SignInContentInAuthModal: React.FC<SignInModalProps> = ({ isOpen, onClose, setScreen }) => {


  const [email, setEmail] = useState<undefined | string>()
  const [password, setPassword] = useState<undefined | string>()
  
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Stop the click event propagation to prevent the modal from closing
    event.stopPropagation();
  };

  const loginMethod = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    try {
      const res = await signIn("credentials", {
        email: email,
        password: password
      })

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
      <div className="flex items-center justify-center min-h-screen ">
        <div className="absolute bg-black w-full max-w-xl p-4 rounded-3xl pb-16" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6 text-white"
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
            <h2 className="text-xl font-bold mx-auto">
            <FaXTwitter size={30} />
            </h2>
          </div>
          <div className="w-2/3 flex flex-col align-center justify-center mx-auto space-y-4 mt-12">
            <h1 className="text-3xl font-bold mb-6">Sign in to X</h1>
          <input
            className="w-full bg-black text-white border p-2 rounded-md focus:outline-none overflow-y-auto focus:border-primary resize-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={handleInputClick}
          ></input>
          <input
            className="w-full bg-black text-white border p-2 rounded-md focus:outline-none overflow-y-auto focus:border-primary resize-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={handleInputClick}
          ></input>
          
          <button className="bg-white text-black px-4 py-2 rounded-xl w-full font-semibold hover:bg-gray-200 " onClick={(e) => loginMethod(e)}>
              <h1>Sign In</h1>
          </button>

          <button type="button"
           onClick={() => signIn("google")}
           className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-xl text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 flex justify-center w-full">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
            </svg>
            Sign in with Google
          </button>
            <div>
              <div className="mt-6 text-gray-400"><div className="inline">Don&apos;t have an account? </div>
              <div className="text-primary hover:underline ms-2 inline hover:cursor-pointer"
               onClick={(e) => {e.stopPropagation(); setScreen("signup") }}>
                Sign Up
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignInContentInAuthModal;
