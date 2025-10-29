import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function ContactForm() {
    const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/contact`, formData)
      .then((response) => {
        console.log("Message sent:", response.data);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    if (formRef.current) setFormHeight(formRef.current.offsetHeight);
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
      <p className="text-gray-600 mb-8">
        Have a question, suggestion, or just want to say hi? I'm thrilled to hear from you!
      </p>

      <div style={{ minHeight: formHeight }}>
        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-md rounded-2xl p-8 text-left"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 shadow-md rounded-2xl p-8 flex items-center justify-center">
            <p className="text-green-600 font-medium text-lg">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
