export async function verificationEmailTemplate(verificationToken) {
    return `
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            table {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                border-collapse: collapse;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 30px;
                text-align: left;
                color: #333;
            }
            .content h1 {
                margin: 0 0 20px;
                font-size: 24px;
            }
            .content p {
                margin: 0 0 15px;
                line-height: 1.6;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .verify-button {
                background-color: #4CAF50;
                color: white;
                padding: 15px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }
            .verify-button:hover {
                background-color: #45a049;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                color: #999;
                font-size: 12px;
            }
            @media only screen and (max-width: 600px) {
                .content {
                    padding: 15px;
                }
                .verify-button {
                    width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <table>
            <tr>
                <td class="header">
                    <h2>Email Verification</h2>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h1>Hello,</h1>
                    <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                    <div class="button-container">
                        <a target="_blank" href="/verify-email/${verificationToken}" class="verify-button">Verify Your Email</a>
                    </div>
                    <p>If you did not create an account, no further action is required.</p>
                    <p>Thanks,<br>The Team</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>If you're having trouble clicking the "Verify Your Email" button, copy and paste the URL below into your web browser:</p>
                    <p>${verificationToken}</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
`
}