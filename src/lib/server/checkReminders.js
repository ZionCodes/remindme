import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { sendReminderEmail } from '$lib/server/sendNotification'; // Import the function to send email notifications

const pb = new PocketBase('https://drove-rain.pockethost.io/');

export const fetchDueReminders = async () => {
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
  const now = new Date();
  const upcomingTime = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now

  const reminders = await pb.collection('reminder').getFullList({
    filter: `date <= "${upcomingTime.toISOString()}" && notification_sent != true`
  });

  return reminders;
};

export const checkReminders = async () => {
  try {
    const dueReminders = await fetchDueReminders();

    for (const reminder of dueReminders) {
      const now = new Date().getTime();
      const reminderDate = new Date(reminder.date).getTime();
      const distance = reminderDate - now;

      // If distance <= 0, send notification
      if (distance <= 0) {
        await sendReminderEmail(reminder);

        // Update the reminder to mark notification as sent
        await pb.collection('reminder').update(reminder.id, {
          notification_sent: true
        });
      }
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

// Function to run checkReminders every minute
const startReminderCheck = () => {
  checkReminders(); // Run immediately
  setInterval(checkReminders, 60 * 1000); // Repeat every minute
};

startReminderCheck();
