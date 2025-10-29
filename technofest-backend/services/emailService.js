const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});

const sendOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'TechnoFest 2025: Your One-Time Password (OTP)',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: auto;">
                    <h2 style="color: #007bff;">TechnoFest 2025 Login Security</h2>
                    <p>You recently attempted to log in to your TechnoFest 2025 account.</p>
                    <p>To complete your login, please use the following One-Time Password (OTP):</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; color: #333; padding: 10px 20px; border: 2px solid #007bff; border-radius: 5px;">${otp}</span>
                    </div>
                    <p>This OTP is valid for 10 minutes.</p>
                    <p>If you did not attempt to log in, please ignore this email.</p>
                    <p>Thank you for using TechnoFest 2025!</p>
                    <p style="font-size: 12px; color: #888;">&copy; 2025 TechnoFest</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error(`Error sending OTP email to ${email}:`, error);
        return false;
    }
};

module.exports = {
    sendOtpEmail
};
