import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Use js-cookie for easier cookie management

const TrackingSettingsPage = () => {
  const [isTrackingEnabled, setTrackingEnabled] = useState(false);

  // Load the current tracking preference from cookies
  useEffect(() => {
    const consent = Cookies.get("userConsent") === "true"; // Check consent status
    if (consent) {
      loadGAScript(); // Load GA script only if consent is true
    }
  }, []);
  
  const loadGAScript = () => {
    const GA_ID = import.meta.env.VITE_GA_ID;
  
    if (!GA_ID || window.gtag) return; // Avoid reloading if already loaded
  
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
  
      gtag("js", new Date());
      gtag("config", GA_ID, { anonymize_ip: true }); // Respect user privacy
    };
  };
  

  // Update the tracking preference in cookies
  const handleToggle = () => {
    const newState = !isTrackingEnabled;
    Cookies.set("userConsent", newState ? "true" : "false", { expires: 365 }); // Save for 1 year
    setTrackingEnabled(newState);

    if (newState) {
      loadGAScript(); // Load GA script when enabled
    } else {
      alert("Tracking has been disabled.");
    }
  };

  return (
    <div className="tracking-settings-container p-4 bg-white shadow rounded-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Tracking Settings</h1>
      <p className="mb-4 text-gray-600">
        Use the toggle below to enable or disable tracking for analytics on this website. Your preference will be saved for future visits.
      </p>

      {/* Toggle Switch */}
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-gray-800 font-medium">
            {isTrackingEnabled ? "Google Analytics" : "Google Analytics"}
          </span>
          <div
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 border ${
              isTrackingEnabled ? "bg-olive" : "bg-gray"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`absolute w-6 h-6 bg-green rounded-full border shadow transform transition-transform duration-300 ${
                isTrackingEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default TrackingSettingsPage;
