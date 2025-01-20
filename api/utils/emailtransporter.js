import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',  // Set to true if using port 465
    auth: {
        user: 'sahandestate@gmail.com',
        pass:'zcazgazabppzgupv'
    },
});

export const emailSender = async (toEmail, username) => {
    const mailOptions = {
        from: 'sahandestate@gmail.com', // Your verified sender email address
        to: toEmail,
        subject: 'Successfully Logged In',
       html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Hello ${username},</h2>
                <p>You have successfully logged into your account. Welcome back!</p>
                <p>Thank you for being a part of our community.</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR21vCVBhSyUwBUxy6miDWD-X9vGrysq2nzWA&s" alt="Sahand Logo" style="width: 150px; height: auto; margin-top: 20px;" />
                <p style="margin-top: 20px;">Best regards,<br />The Sahand Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Failed to send login confirmation email');
    }
};


