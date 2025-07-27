import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const WelcomeHeader = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between">
        <p className="text-3xl font-semibold font-mono">Welcome back, <span className="text-accent">{currentUser.firstname}</span></p>
        <span className="badge badge-primary">{currentUser.learningGoal}</span>
      </header>
    </div>
  );
};

export default WelcomeHeader;
