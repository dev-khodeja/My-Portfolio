import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendURL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

      const res = await fetch(`${backendURL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Response not OK");
      }


      alert("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      console.error("FRONTEND ERROR 👉", err);
      alert("Failed to send message ❌");
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
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn-primary mx-auto">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
