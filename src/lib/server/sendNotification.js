import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendReminderEmail = async (reminder) => {
  if (!reminder.user || !reminder.user.email) {
    throw new Error(`Cannot send email for reminder ${reminder.id}: User or user email is missing`);
  }

  const formattedDate = new Date(reminder.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const msg = {
    to: reminder.user.email,
    from: 'hello@relocateforwork.com', // Make sure this is your verified sender email
    subject: `📅 Reminder: ${reminder.name}`,
    text: reminder.description,
    html: `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder: Sample Reminder</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    body, html {
      font-family: 'Roboto', Arial, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #f8f9fa;
    }
    .header {
      background-color: #0f766e;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .reminder-box {
      background-color: #e6f3f2;
      border-left: 4px solid #0f766e;
      padding: 15px;
      margin: 20px 0;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #0f766e;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9em;
      color: #6c757d;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reminder Alert</h1>
    </div>
    <div class="content">
      <h2>Hello, John Doe!</h2>
      <p>This is a friendly reminder for your upcoming event:</p>
      <div class="reminder-box">
        <h3 style="color: #0f766e; margin-top: 0;"> ${reminder.name}</h3>
        <p><strong>Description:</strong> ${reminder.description}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
      </div>
      <p>Don't forget to prepare for this event. If you need to make any changes or view more details, click the button below:</p>
      <p style="text-align: center;">
        <a href="https://relocateforwork.com/view-reminder/sample-id" class="btn">View Reminder Details</a>
      </p>
    </div>
    <div class="footer">
      <p>© 2024 Relocate for Work. All rights reserved.</p>
      <p>
        <a href="https://relocateforwork.com/unsubscribe" style="color: #0f766e;">Unsubscribe</a> | 
        <a href="https://relocateforwork.com/contact" style="color: #0f766e;">Contact Us</a>
      </p>
      <p>
        <a href="https://twitter.com/relocate4work" style="text-decoration: none;">
          <img src="/api/placeholder/24/24" alt="Twitter" style="width: 24px; margin: 0 5px;">
        </a>
        <a href="https://facebook.com/relocate4work" style="text-decoration: none;">
          <img src="/api/placeholder/24/24" alt="Facebook" style="width: 24px; margin: 0 5px;">
        </a>
        <a href="https://linkedin.com/company/relocate4work" style="text-decoration: none;">
          <img src="/api/placeholder/24/24" alt="LinkedIn" style="width: 24px; margin: 0 5px;">
        </a>
      </p>
    </div>
  </div>
</body>
</html>`,
  };

  try {
    console.log(`Sending email to ${reminder.user.email} for reminder ID: ${reminder.id}`);
    await sgMail.send(msg);
    console.log(`Email sent for reminder ID: ${reminder.id}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error so the calling function knows the email failed
  }
};