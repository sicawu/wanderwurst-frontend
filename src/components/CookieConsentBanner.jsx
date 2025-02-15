import React, { useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  const GA_ID = import.meta.env.VITE_GA_ID;

  // Helper function to get a cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const isConsentGiven = getCookie("userConsent") === "true";

    if (isConsentGiven && GA_ID) {
      // Load the GA script if consent is given
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_ID);
      };
    }
  }, [GA_ID]);

  return (
    <CookieConsent
      location="bottom"
      buttonText="I Agree"
      cookieName="userConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        background: "#4CAF50",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "5px",
        padding: "10px 20px",
      }}
      expires={365}
      onAccept={() => {
        document.cookie = `userConsent=true; path=/; max-age=${365 * 24 * 60 * 60}; Secure; SameSite=Strict`;
      }}
      onDecline={() => {
        document.cookie = `userConsent=false; path=/; max-age=${365 * 24 * 60 * 60}; Secure; SameSite=Strict`;
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
