import { createTransport } from "nodemailer"
import { verificationEmailTemplate } from "./verificationEmailHtml"

export async function sendVerificationEmail(email, verificationToken) {
    try {
        var transport = createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "mhflicks5@gmail.com",
                pass: "hnzexfniaupgkrbj",
            },
        });

        const mailOptions = {
            from: "mhmitas.dev@gmail.com",
            to: 'mahfuzulmitas@gmail.com',
            subject: "Verify your email address",
            html: await verificationEmailTemplate(verificationToken)
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