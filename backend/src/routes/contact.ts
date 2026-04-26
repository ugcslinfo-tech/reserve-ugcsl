import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { timingSafeEqual } from 'crypto';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact';

const router = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

const validate = [
  body('name').trim().notEmpty().isLength({ max: 100 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('phone').optional().trim().isMobilePhone('any'),
  body('subject').trim().notEmpty().isLength({ max: 200 }),
  body('message').trim().notEmpty().isLength({ max: 2000 }),
];

router.post('/', contactLimiter, validate, async (req: Request, res: Response) => {
  // CSRF: compare signed cookie token against x-csrf-token header using timing-safe comparison
  const cookieToken = req.signedCookies?.csrf_token as string | undefined;
  const headerToken = req.headers['x-csrf-token'] as string | undefined;
  if (
    !cookieToken ||
    !headerToken ||
    cookieToken.length !== headerToken.length ||
    !timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken))
  ) {
    res.status(403).json({ success: false, message: 'Invalid CSRF token.' });
    return;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.array() });
    return;
  }

  try {
    const { name, email, phone, subject, message } = req.body;
    await Contact.create({ name, email, phone, subject, message });

    // Send email notification — non-blocking, don't fail the request if email fails
    transporter.sendMail({
      from: `"UGCSL Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[UGCSL Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="6">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    }).catch((err) => console.error('Email send failed:', err));

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

export default router;
