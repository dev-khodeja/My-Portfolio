import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "https://my-portfolio-nine-omega-29.vercel.app",
      "https://my-portfolio-nine-omega-29.vercel.app/",
      "http://localhost:3000",
      "http://localhost:5173" // Vite default
    ];
    
    if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin + '/')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    emailConfigured: !!process.env.EMAIL_USER
  });
});

app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact form submitted:", req.body);
  
  const { name, email, message } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required" 
    });
  }

  try {
    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Email credentials missing in environment variables");
      return res.status(500).json({
        success: false,
        error: "Email service configuration error"
      });
    }

    console.log("📧 Attempting to send email from:", process.env.EMAIL_USER);
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add these for better connection handling
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // Use your email as from
      replyTo: email, // User's email as reply-to
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">This message was sent from your portfolio website.</p>
        </div>
      `,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    
    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });
    
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
    
    // More specific error messages
    let errorMessage = "Failed to send email";
    if (err.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Check credentials.";
    } else if (err.code === 'ECONNECTION') {
      errorMessage = "Connection to email server failed.";
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err);
  res.status(500).json({ 
    success: false, 
    error: "Internal server error" 
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email user configured: ${!!process.env.EMAIL_USER}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});