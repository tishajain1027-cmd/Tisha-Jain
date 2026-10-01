import { RsvpData } from '../types';
import { getSupabase } from './supabaseClient';

export const NOTIFICATION_EMAILS = [
  'trisha.saluja1993@gmail.com',
  'tishajain1027@gmail.com',
];

export const RESEND_API_KEY: string =
  import.meta.env.VITE_RESEND_API_KEY || '';

export const RESEND_FROM_EMAIL: string =
  import.meta.env.VITE_RESEND_FROM_EMAIL ||
  'Baby Gulati Shower RSVP <onboarding@resend.dev>';

export function buildResendEmailHtml(rsvp: RsvpData): string {
  const isAccepting = rsvp.attendance === 'accepted';
  const statusLabel = isAccepting
    ? `Joyfully Accepts (${rsvp.guestCount} ${
        rsvp.guestCount === 1 ? 'Guest' : 'Guests'
      })`
    : 'Regretfully Declines';

  const submittedTime = new Date(rsvp.submittedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #FAF7F2; border: 1px solid #CBDDE9; border-radius: 16px; padding: 24px; color: #1E3A5F;">
      <h2 style="margin: 0 0 8px 0; color: #19354E; font-size: 22px;">
        🪿 New Baby Shower RSVP Received!
      </h2>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #537A99;">
        Celebrating Baby Gulati • Aman &amp; Trisha Gulati
      </p>
      <table style="width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D5E4EF;">
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-weight: bold; width: 40%; font-size: 14px;">Guest Name</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-size: 14px;">${rsvp.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-weight: bold; font-size: 14px;">Response</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-size: 14px;">${statusLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-weight: bold; font-size: 14px;">Guest Count</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-size: 14px;">${
            isAccepting ? rsvp.guestCount : 0
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-weight: bold; font-size: 14px;">Sweet Note</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #EAF1F6; font-size: 14px;">${
            rsvp.message?.trim() || 'None'
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; font-size: 14px;">Submitted At</td>
          <td style="padding: 12px 16px; font-size: 14px;">${submittedTime}</td>
        </tr>
      </table>
    </div>
  `;
}

/**
 * Sends an RSVP email notification via Resend to trisha.saluja1993@gmail.com and tishajain1027@gmail.com.
 * Supports:
 * 1) Direct Resend REST API (`https://api.resend.com/emails`) when VITE_RESEND_API_KEY is configured
 * 2) Supabase Edge Function (`send-rsvp-email`) if deployed in your Supabase project
 */
export async function sendResendRsvpEmail(rsvp: RsvpData): Promise<void> {
  const subject = `Baby Gulati Shower RSVP: ${rsvp.name} (${
    rsvp.attendance === 'accepted' ? 'Attending' : 'Declined'
  })`;
  const html = buildResendEmailHtml(rsvp);

  const resendPayload = {
    from: RESEND_FROM_EMAIL,
    to: NOTIFICATION_EMAILS,
    subject,
    html,
  };

  // 1. Send via Resend API if VITE_RESEND_API_KEY is set
  if (RESEND_API_KEY && !RESEND_API_KEY.includes('your-resend-api-key')) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendPayload),
      });
    } catch (err) {
      console.warn('Resend API email warning:', err);
    }
  }

  // 2. Also invoke Supabase Edge Function `send-rsvp-email` if Supabase is configured
  const supabase = getSupabase();
  if (supabase?.functions?.invoke) {
    try {
      await supabase.functions.invoke('send-rsvp-email', {
        body: {
          to: NOTIFICATION_EMAILS,
          subject,
          html,
          rsvp: {
            name: rsvp.name,
            guest_count: rsvp.guestCount,
            response: rsvp.attendance,
            message: rsvp.message,
            submitted_at: rsvp.submittedAt,
          },
        },
      });
    } catch {
      // Edge function is optional if direct Resend API is used
    }
  }
}
