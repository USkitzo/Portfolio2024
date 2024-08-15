import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Crée un transporteur Nodemailer avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Ton adresse Gmail
    pass: process.env.GMAIL_PASS, // Ton mot de passe d'application si 2FA activé
  },
});

export async function POST(req) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  // Configuration de l'email
  const mailOptions = {
    from: `"Contact Form" <${process.env.GMAIL_USER}>`, // Utilise ton adresse Gmail comme expéditeur
    to: process.env.GMAIL_USER, // Ton adresse Gmail où l'email sera envoyé
    subject: subject,
    text: message,
    replyTo: email, // L'adresse e-mail de l'expéditeur pour que tu puisses répondre directement
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message });
  }
}
