import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

// Initialize EmailJS
emailjs.init("QPL-htplxTxxmXVeA");

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

    // Show loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      const serviceID = "service_nn3ucyq";
      const templateID = "template_bv2u1tg";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "socialsaibd@gmail.com",
        date: new Date().toLocaleString(),
      };

      await emailjs.send(serviceID, templateID, templateParams);

      // Success toast
      toast.success("🎉 Message sent successfully! I'll respond soon.", {
        id: loadingToast,
        duration: 5000,
        style: {
          background: '#10b981',
          color: 'white',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        },
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Email error:", error);
      
      // Error toast
      toast.error("❌ Failed to send message. Please try again.", {
        id: loadingToast,
        duration: 5000,
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      {/* Add Toaster component */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: '16px',
            maxWidth: '400px',
          },
        }}
      />

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

        <button type="submit" className="btn-primary mx-auto" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      <style jsx>{`
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 14px 32px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;