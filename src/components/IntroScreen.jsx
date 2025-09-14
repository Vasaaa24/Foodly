
import { useState, useEffect } from "react";
import "./IntroScreen.css";
import qrestLogo from "../assets/qrest-logo.png";

const IntroScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Čekáme na fade out animaci
    }, 5000); // 5 sekund

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`intro-screen ${!isVisible ? "fade-out" : ""}`}>
      <div className="intro-background">
        <div className="floating-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>


        <div className="intro-content">

          <div className="logo-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
            <img src={qrestLogo} alt="QRest logo" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
          </div>

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default IntroScreen;
