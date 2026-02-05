const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // For development, use console logging
  if (process.env.NODE_ENV === 'development') {
    return {
      sendMail: async (mailOptions) => {
        console.log('\n📧 Email would be sent in production:');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content:', mailOptions.text || mailOptions.html);
        console.log('---\n');
        return { messageId: 'dev-' + Date.now() };
      }
    };
  }

  // For production, use real email service
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const transporter = createTransporter();

// Send OTP email
exports.sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@metaia.com',
    to: email,
    subject: 'Your METAIA Verification Code',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5e6d3; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .logo { text-align: center; margin-bottom: 30px; }
          .logo-text { font-size: 32px; font-weight: bold; color: #7A1F1F; }
          .content { text-align: center; }
          h1 { color: #7A1F1F; margin-bottom: 10px; }
          .otp-box { background: linear-gradient(135deg, #D4AF37, #C5A028); color: white; font-size: 36px; font-weight: bold; padding: 20px; border-radius: 12px; margin: 30px 0; letter-spacing: 8px; }
          .info { color: #666; font-size: 14px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <div class="logo-text">METAIA</div>
          </div>
          <div class="content">
            <h1>Verify Your Account</h1>
            <p>Hello ${name || 'there'},</p>
            <p>Your verification code is:</p>
            <div class="otp-box">${otp}</div>
            <div class="info">
              <p>⏱️ This code will expire in 10 minutes.</p>
              <p>🔒 For security reasons, never share this code with anyone.</p>
            </div>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 METAIA. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hello ${name || 'there'},\n\nYour METAIA verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\n- METAIA Team`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw error;
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@metaia.com',
    to: email,
    subject: 'Welcome to METAIA - Your Personal Tailor Connection',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5e6d3; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #D4AF37, #C5A028); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
          h1 { margin: 0; font-size: 28px; }
          .content { color: #333; line-height: 1.6; }
          .features { background: #f5e6d3; padding: 20px; border-radius: 12px; margin: 20px 0; }
          .feature { margin: 10px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #D4AF37, #C5A028); color: white; padding: 15px 40px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to METAIA! 🎉</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for joining METAIA - your personal connection to expert tailors!</p>
            <div class="features">
              <div class="feature">✨ <strong>Browse Styles:</strong> Discover traditional and modern designs</div>
              <div class="feature">📏 <strong>Custom Measurements:</strong> Get perfectly fitted garments</div>
              <div class="feature">👔 <strong>Expert Tailors:</strong> Connect with skilled professionals</div>
              <div class="feature">🚚 <strong>Easy Delivery:</strong> Convenient pickup and delivery</div>
            </div>
            <p>Start your journey to perfectly tailored clothes today!</p>
            <center>
              <a href="http://localhost:3000" class="button">Explore Now</a>
            </center>
          </div>
          <div class="footer">
            <p>&copy; 2026 METAIA. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome to METAIA!\n\nHi ${name},\n\nThank you for joining METAIA - your personal connection to expert tailors!\n\nGet started today and experience perfectly fitted garments.\n\n- METAIA Team`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    // Don't throw error for welcome email
  }
};
