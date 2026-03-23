import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  details?: string;
};

function normalize(input: unknown): string {
  return typeof input === 'string' ? input.trim() : '';
}

function getEnv(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = normalize(payload.name);
    const email = normalize(payload.email);
    const phone = normalize(payload.phone);
    const details = normalize(payload.details);

    if (!name || !email || !details) {
      return NextResponse.json(
        { message: "Ім'я, email і деталі проєкту є обов'язковими." },
        { status: 400 }
      );
    }

    const gmailUser = getEnv('GMAIL_USER');
    const gmailAppPassword = getEnv('GMAIL_APP_PASSWORD');
    const contactTo = getEnv('CONTACT_TO') || gmailUser;

    if (!gmailUser || !gmailAppPassword || !contactTo) {
      return NextResponse.json(
        {
          message:
            'Поштовий сервер не налаштований. Вкажіть GMAIL_USER, GMAIL_APP_PASSWORD і CONTACT_TO.',
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `HelioNest Website <${gmailUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `Нова заявка на сонячну систему від ${name}`,
      text: [
        `Ім'я: ${name}`,
        `Email: ${email}`,
        `Телефон: ${phone || 'Не вказано'}`,
        '',
        'Деталі проєкту:',
        details,
      ].join('\n'),
      html: `
        <h2>Нова заявка на сонячну систему</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не вказано'}</p>
        <p><strong>Деталі проєкту:</strong></p>
        <p>${details.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ message: 'Дякуємо! Ваш запит успішно надіслано.' });
  } catch {
    return NextResponse.json(
      { message: 'Не вдалося надіслати лист. Спробуйте ще раз.' },
      { status: 500 }
    );
  }
}
