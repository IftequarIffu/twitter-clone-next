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


  const [screen, setScreen] = useState<"signin" | "signup">("signin")

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
