import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173', // Local Vite dev server
  process.env.FRONTEND_URL  // Production URL if defined
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or local tools)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Contact form POST endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message is required' });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters long' });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || 'tasoriajatin@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log(`[Contact Form API] New message received from ${name} <${email}>`);

  // Check if SMTP settings are configured
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('--------------------------------------------------');
    console.log('⚠️  [SMTP CONFIG WARNING] No SMTP settings found in .env.');
    console.log('Printing submission contents to console instead of sending email:');
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------------------');

    return res.status(200).json({
      message: 'Submission received successfully (simulated via console log). Configure SMTP settings to receive real emails.'
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Setup email data
  const mailOptions = {
    from: `"${name}" <${smtpUser}>`, // Send on behalf of user via authenticated sender
    to: receiverEmail,
    replyTo: email, // Set reply-to to the sender's actual email
    subject: `Portfolio Contact: Message from ${name}`,
    text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #6366f1; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6366f1; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`[SMTP success] Email sent successfully to ${receiverEmail}`);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('[SMTP error] Failed to send email via nodemailer:', error);
    return res.status(500).json({ message: 'Failed to dispatch email. Please check server SMTP configuration.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Contact Form Backend is running on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
});
