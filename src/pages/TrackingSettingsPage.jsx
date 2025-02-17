import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Use js-cookie for easier cookie management

const TrackingSettingsPage = () => {
  const [isTrackingEnabled, setTrackingEnabled] = useState(false);

  // Load the current tracking preference from cookies
  useEffect(() => {
    const consent = Cookies.get("userConsent") === "true"; // Check consent status
    setTrackingEnabled(consent); // Set state based on cookie value
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
    }
    // No alert when tracking is disabled
  };

  return (
    <div className="flex flex-col min-h-screen bg-light-gray">
      {/* Main Content */}
      <div className="tracking-settings-container flex-grow p-8 bg-white shadow-lg rounded-xl max-w-lg mx-auto my-10">
        <h1 className="text-3xl font-semibold mb-6 text-dark-gray">Tracking Settings</h1>
        <p className="mb-6 text-base text-gray-700">
          Use the toggle below to enable or disable tracking for analytics on this website. Your preference will be saved for future visits.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-xl text-dark-gray font-medium">
              {isTrackingEnabled ? "Google Analytics" : "Google Analytics"}
            </span>
            <div
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 border-2 ${
                isTrackingEnabled ? "bg-olive" : "bg-light-gray"
              }`}
              onClick={handleToggle}
            >
              <div
                className={`absolute w-7 h-7 bg-white rounded-full border-2 shadow-lg transform transition-transform duration-300 ${
                  isTrackingEnabled ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      </div>
  );
};

export default TrackingSettingsPage;
