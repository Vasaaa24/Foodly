import { useState, useEffect } from "react";
import "./IntroScreen.css";

const IntroScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Čekáme na fade out animaci
    }, 7000); // 7 sekund

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
          <div className="logo-container">
            <div className="fork-icon">
              <div className="fork-handle"></div>
              <div className="fork-prongs">
                <div className="prong"></div>
                <div className="prong"></div>
                <div className="prong"></div>
              </div>
            </div>
            <div className="logo-text">
              <span className="logo-food">Food</span>
              <span className="logo-ly">ly</span>
            </div>
          </div>

          <div className="tagline">
            <span>Váš digitální oficiant k službám</span>
          </div>

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>

        <div className="sparkles">
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">✨</div>
          <div className="sparkle sparkle-3">✨</div>
          <div className="sparkle sparkle-4">✨</div>
          <div className="sparkle sparkle-5">✨</div>
          <div className="sparkle sparkle-6">✨</div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
