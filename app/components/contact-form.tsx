'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      details: String(formData.get('details') ?? '').trim(),
    };

    setStatus('loading');
    setMessage('Надсилаємо ваш запит...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? 'Не вдалося надіслати ваше повідомлення.');
      }

      setStatus('success');
      setMessage(data.message ?? 'Повідомлення успішно надіслано.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Щось пішло не так. Спробуйте ще раз.'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4">
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs sm:gap-2 sm:text-sm font-medium text-slate-100">
          Повне ім’я
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder:text-white/70 focus:border-amber-300 focus:outline-none"
            placeholder="Іван Петренко"
          />
        </label>

        <label className="grid gap-1.5 text-xs sm:gap-2 sm:text-sm font-medium text-slate-100">
          Електронна пошта
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder:text-white/70 focus:border-amber-300 focus:outline-none"
            placeholder="ivan@email.com"
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-xs sm:gap-2 sm:text-sm font-medium text-slate-100">
        Телефон
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className="rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder:text-white/70 focus:border-amber-300 focus:outline-none"
          placeholder="+1 (555) 123-4567"
        />
      </label>

      <label className="grid gap-1.5 text-xs sm:gap-2 sm:text-sm font-medium text-slate-100">
        Деталі проєкту
        <textarea
          required
          name="details"
          rows={4}
          className="resize-y rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder:text-white/70 focus:border-amber-300 focus:outline-none"
          placeholder="Розкажіть про ваш об’єкт, поточні рахунки та цілі."
        />
      </label>

      <div className="flex flex-col gap-2.5 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-amber-300 px-5 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm font-bold text-slate-900 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? 'Надсилання...' : 'Надіслати Запит'}
        </button>

        <p
          className={`text-xs sm:text-sm ${
            status === 'error'
              ? 'text-rose-200'
              : status === 'success'
                ? 'text-emerald-200'
                : 'text-slate-200'
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </form>
  );
}

