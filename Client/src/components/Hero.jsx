import React, { useState } from "react";
import "../App.css";

const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Try multiple methods for better compatibility
      
      // Method 1: Direct link (works if file is in public folder)
      const pdfUrl = "/cv.pdf";
      
      // Create temporary link
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Khodeja_Aktar_CV.pdf"; // Force PDF extension
      link.setAttribute("type", "application/pdf");
      
      // Append to body and click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: Open in new tab if download doesn't work
      setTimeout(() => {
        // Check if download likely succeeded
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        
        if (isIOS || isAndroid) {
          // Mobile devices often open in new tab instead of downloading
          window.open(pdfUrl, "_blank");
        }
      }, 1000);
      
    } catch (error) {
      console.error("Download error:", error);
      // Fallback: Open in new tab
      window.open("/cv.pdf", "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Khodeja Aktar</h1>
        <h2>MERN Stack Developer</h2>
        <p>I build scalable web applications using MongoDB, Express, React, and Node.js.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn-primary">Contact Me</a>
          <a href="https://github.com/dev-khodeja" className="btn-primary">Github</a>
          <button 
            onClick={handleDownload}
            className="btn-primary"
            disabled={isDownloading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isDownloading ? (
              <>
                <span className="spinner"></span>
                Downloading...
              </>
            ) : (
              "Download CV"
            )}
          </button>
        </div>
      </div>
      
      {/* Add spinner styles */}
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
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

export default Hero;