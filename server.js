const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index_new.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || 'lakshyakhetan00@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(45deg, #e84949, #ff6b6b); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
                    </div>
                    <div style="padding: 30px; background: #f8f9fa;">
                        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                            <h2 style="color: #343d68; margin-bottom: 20px;">Contact Details</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Name:</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Email:</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Subject:</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
                                </tr>
                            </table>
                            <h3 style="color: #343d68; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #e84949;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                            <p>This message was sent from your portfolio website contact form.</p>
                            <p>Sent on: ${new Date().toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            `
        };

        // Auto-reply to sender
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(45deg, #e84949, #ff6b6b); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Thank You, ${name}!</h1>
                    </div>
                    <div style="padding: 30px; background: #f8f9fa;">
                        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                            <p style="font-size: 18px; color: #333; line-height: 1.6;">
                                Hi ${name},
                            </p>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">
                                Thank you for reaching out through my portfolio website! I've received your message about "<strong>${subject}</strong>" and I'll get back to you as soon as possible.
                            </p>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">
                                I appreciate your interest and look forward to our conversation.
                            </p>
                            <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #e84949;">
                                <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your message:</strong></p>
                                <p style="margin: 10px 0 0 0; color: #555;">${message}</p>
                            </div>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #e84949;">Lakshya Khetan</strong><br>
                                <span style="color: #666;">Software Developer & Full-Stack Engineer</span>
                            </p>
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                            <p style="color: #666; font-size: 14px; margin: 5px 0;">
                                Connect with me:
                            </p>
                            <div style="margin-top: 10px;">
                                <a href="https://github.com/fusebox440" style="color: #e84949; text-decoration: none; margin: 0 10px;">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(autoReplyOptions)
        ]);

        res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully! Thank you for contacting me.' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server with port-fallback logic
function startServer(port, attempts = 0) {
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Visit: http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < 5) {
            const nextPort = port + 1;
            console.warn(`Port ${port} in use, trying ${nextPort}...`);
            setTimeout(() => startServer(nextPort, attempts + 1), 500);
        } else {
            console.error('Failed to start server:', err);
            process.exit(1);
        }
    });
}

startServer(PORT);

module.exports = app;