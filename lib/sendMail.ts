import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});


const LOGO_URL =
  "https://raw.githubusercontent.com/nmeedg/ai-resume-builder/cb0119b9cbecbf878dbdcf8a065080377519c575/public/assets/logo/logo.svg";

export type MailType = "verify_email" | "reset_password";

const ICONS: Record<MailType, string> = {
  verify_email: `gy
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.5L9.5 17L19 7" stroke="#0F6E56" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  reset_password: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2.2" stroke="#0F6E56" stroke-width="2.2"/>
      <path d="M8 11V7.5C8 5.01472 10.0147 3 12.5 3C14.9853 3 17 5.01472 17 7.5V11" stroke="#0F6E56" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="12" cy="15.8" r="1.4" fill="#0F6E56"/>
    </svg>
  `,
};

export async function sendMail(email: string, type: MailType, url: string) {
  const from = `Tailrcv <${process.env.EMAIL_FROM}>`;

  const isVerify = type === "verify_email";

  const subject = isVerify
    ? "Verify your email address"
    : "Reset your password";

  const title = isVerify ? "Verify your email address" : "Reset your password";

  const description = isVerify
    ? "Thanks for signing up for Tailrcv. Please confirm this is your email address so we can activate your account."
    : "We received a request to reset the password for your Tailrcv account. Click the button below to choose a new one.";

  const buttonText = isVerify ? "Verify email address" : "Reset password";

  const expiryText = isVerify
    ? "This link will expire in 1 hour. If you didn't create a Tailrcv account, you can safely ignore this email."
    : "This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email — your password won't be changed.";

  const preheader = isVerify
    ? "Confirm your email address to activate your Tailrcv account."
    : "Reset the password for your Tailrcv account.";

  const icon = ICONS[type];

  const html = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${subject}</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #F4F6F5; }

  @media screen and (max-width: 600px) {
    .email-container { width: 100% !important; }
    .fluid-padding { padding-left: 24px !important; padding-right: 24px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#F4F6F5;">

  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F6F5;">
    <tr>
      <td align="center" style="padding: 48px 16px;">

        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" style="width:560px; max-width:560px; background-color:#FFFFFF; border-radius:12px; border:1px solid #E7EBE9;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 40px 40px 0 40px;">
              <img src="${LOGO_URL}" width="120" alt="Tailrcv" style="display:block; width:200px; height:auto;">
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 40px 0 40px;">
              <div style="border-top: 1px solid #EEEFEA; line-height:0; font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Icon -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 32px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" valign="middle" width="56" height="56" style="width:56px; height:56px; background-color:#E1F5EE; border-radius:50%;">
                    ${icon}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 24px 40px 0 40px; font-family: Arial, Helvetica, sans-serif;">
              <h1 style="margin:0; font-size:22px; line-height:28px; color:#1A1A2E; font-weight:700;">
                ${title}
              </h1>
            </td>
          </tr>

          <!-- Body text -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 12px 40px 0 40px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#5F5E5A;">
                ${description}
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 32px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius:10px; background-color:#1D9E75;">
                    <a href="${url}" target="_blank" style="display:inline-block; padding:14px 32px; font-family: Arial, Helvetica, sans-serif; font-size:15px; font-weight:600; color:#FFFFFF; text-decoration:none; border-radius:10px;">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Fallback link -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 24px 40px 0 40px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0; font-size:13px; line-height:20px; color:#9A9A94;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin:6px 0 0 0; font-size:13px; line-height:20px; word-break:break-all;">
                <a href="${url}" style="color:#1D9E75; text-decoration:underline;">${url}</a>
              </p>
            </td>
          </tr>

          <!-- Expiry / security note -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 24px 40px 0 40px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0; font-size:13px; line-height:20px; color:#9A9A94;">
                ${expiryText}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <div style="border-top: 1px solid #EEEFEA; line-height:0; font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="fluid-padding" style="padding: 24px 40px 40px 40px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0; font-size:12px; line-height:18px; color:#B0B0A8;">
                Tailrcv &middot; This is an automated message, please don't reply directly to this email.
              </p>
            </td>
          </tr>

        </table>

        <!-- Outer footer -->
        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" style="width:560px; max-width:560px;">
          <tr>
            <td align="center" style="padding: 24px 20px 0 20px; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin:0; font-size:12px; line-height:18px; color:#B0B0A8;">
                &copy; 2026 Tailrcv. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  try {
    const { data, error } = await transporter.sendMail({
      from,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}

export default sendMail;
