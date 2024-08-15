import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Crée un transporteur Nodemailer avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Ton adresse Gmail
    pass: process.env.GMAIL_PASS, // Ton mot de passe ou mot de passe d'application si 2FA activé
  },
});

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  // Configuration de l'email
  const mailOptions = {
    from: email, // Adresse de l'expéditeur (l'email du formulaire)
    to: process.env.GMAIL_USER, // Ton adresse Gmail
    subject: subject,
    text: message,
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
