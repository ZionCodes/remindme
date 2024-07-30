import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendReminderEmail = async (reminder) => {
  const msg = {
    to: reminder.user.email, // Ensure 'user.email' is a field in your reminder collection
    from: 'test@example.com', // Your verified sender
    subject: `Reminder: ${reminder.name}`,
    text: reminder.description,
    html: `<strong>${reminder.description}</strong>`,
  };

  try {
    console.log(`Sending email to ${reminder.user.email} for reminder ID: ${reminder.id}`);
    await sgMail.send(msg);
    console.log(`Email sent for reminder ID: ${reminder.id}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
