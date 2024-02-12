// AuthModal.tsx
'use client'
import React, { useState } from "react";

import SignInContentInAuthModal from "./SignInContentInAuthModal";
import SignUpContentInAuthModal from "./SignUpContentInAuthModal";


interface AuthModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isModalOpen, handleCloseModal }) => {

  const [replytext, setReplyText] = useState("")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [screen, setScreen] = useState<"signin" | "signup">("signin")

  
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Stop the click event propagation to prevent the modal from closing
    event.stopPropagation();
  };


  if(screen === "signin")
    return (
      <SignInContentInAuthModal isOpen={isModalOpen}
      onClose={handleCloseModal} setScreen={setScreen as any} />
      
    );
  else{
    return (
      <SignUpContentInAuthModal isOpen={isModalOpen}
      onClose={handleCloseModal} setScreen={setScreen as any} />
    )
  }

};

export default AuthModal;
