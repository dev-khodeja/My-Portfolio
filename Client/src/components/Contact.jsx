import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      
      if (!backendURL) {
        throw new Error("Backend URL is not configured");
      }

      console.log("Sending request to:", `${backendURL}/api/contact`);
      
      const res = await fetch(`${backendURL}/api/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      alert("Message sent successfully! ✅");
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      console.error("FRONTEND ERROR:", err);
      alert(`Failed to send message: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact Me</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
        ></textarea>

        <button 
          type="submit" 
          className="btn-primary mx-auto"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;