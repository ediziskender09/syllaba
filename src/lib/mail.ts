import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(key);
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.AUTH_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || "Syllaba <onboarding@resend.dev>";
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${siteUrl()}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: email,
    subject: "Verify your Syllaba email",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #1a2e24;">
        <h1 style="font-size: 24px; font-weight: 600;">Confirm your email</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #3d5248;">
          Thanks for joining Syllaba. Click below to verify your email and finish setting up your account.
        </p>
        <p style="margin: 28px 0;">
          <a href="${verifyUrl}" style="display:inline-block;background:#2F6A52;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;font-family:system-ui,sans-serif;font-size:14px;">
            Verify email
          </a>
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #6b7c73;">
          Or paste this link into your browser:<br/>
          <a href="${verifyUrl}" style="color:#2F6A52;word-break:break-all;">${verifyUrl}</a>
        </p>
        <p style="font-size: 12px; color: #8a9a91;">This link expires in 24 hours.</p>
      </div>
    `,
    text: `Confirm your Syllaba email:\n\n${verifyUrl}\n\nThis link expires in 24 hours.`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
