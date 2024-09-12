import { createTransport } from "nodemailer"
import { verificationEmailTemplate } from "./verificationEmailHtml"

export async function sendVerificationEmail(email, verificationToken) {
    try {
        var transport = createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ae97f60a19bc55",
                pass: "50bca344eccea5"
            }
        });

        const mailOptions = {
            from: "mhmitas.dev@gmail.com",
            to: 'mahfuzulmitas@gmail.com',
            subject: "Verify your email address",
            text: "Hello, world"
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email sending error: ", error)
            }
            console.log(`Email sent: ${info?.response || info}`)
            return true
        })
    } catch (error) {
        console.error("Verification email error: " + error);
    }
}