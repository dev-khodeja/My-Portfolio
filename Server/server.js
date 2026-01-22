import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS - Allow your Vercel frontend
app.use(cors({
  origin: [
    "https://my-portfolio-nine-omega-29.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact form received:", req.body);
  
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required" 
    });
  }

  try {
    // Check credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials missing!");
      return res.status(500).json({
        success: false,
        error: "Server configuration error"
      });
    }

    console.log("Attempting to connect to Gmail SMTP...");
    
    // Try different configurations
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000, // Increased timeout
      tls: {
        rejectUnauthorized: false // Important for Render
      },
      debug: true, // This will show detailed logs
      logger: true
    });

    // Verify connection
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified!");

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    
    res.json({ 
      success: true, 
      message: "Message sent successfully!" 
    });
    
  } catch (error) {
    console.error("❌ Email error details:");
    console.error("- Error name:", error.name);
    console.error("- Error code:", error.code);
    console.error("- Error message:", error.message);
    
    // Try alternative port if 587 fails
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.log("Trying alternative configuration...");
      
      // You could implement retry logic here with port 465
    }
    
    res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? "Yes" : "No"}`);
});