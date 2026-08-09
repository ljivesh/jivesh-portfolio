import { Resend } from "resend";

function client() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function sendContactNotification(input: { id: string; name: string; email: string; subject: string; message: string }) {
  const resend = client();
  if (!resend || !process.env.RESEND_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) throw new Error("Resend is not configured");
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `[Portfolio] ${input.subject}`,
    text: `From: ${input.name} <${input.email}>\nSubmission: ${input.id}\n\n${input.message}`,
  });
  if (error) throw new Error(error.message);
  return data?.id ?? null;
}

export async function sendPasswordSetupEmail(input: { email: string; name: string; url: string }) {
  const resend = client();
  if (!resend || !process.env.RESEND_FROM_EMAIL) throw new Error("Resend is not configured");
  const { error } = await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL, to: input.email, subject: "Set up your Portfolio OS admin account", text: `Hi ${input.name},\n\nSet your password and enroll two-factor authentication:\n${input.url}\n\nThis link expires soon.` });
  if (error) throw new Error(error.message);
}
