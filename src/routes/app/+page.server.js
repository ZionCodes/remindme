// Import necessary modules and components
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

// Define the load function
export const load = async ({ locals }) => {
    // Check if the user is logged in
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    try {
        // Initialize PocketBase and authenticate
        const pb = new PocketBase('https://drove-rain.pockethost.io/');
        await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

        // Fetch reminders for the logged-in user
        const reminders = await pb.collection('reminder').getFullList({
            filter: `field="${locals.user.id}"`, // Assuming 'field' is your actual field name for user ID
        });

        // Format reminders
        const formattedReminders = reminders.map((reminder) => ({
            name: reminder.name,
            description: reminder.description,
            id: reminder.id,
            targetDate: reminder.date
            // Add more fields as needed
        }));

        // Log formatted reminders to console for debugging
        console.log('Formatted Reminders:', formattedReminders);

        // Return formatted reminders to be passed to page.svelte
        return {
            formattedReminders,
        };

    } catch (error) {
        console.error('Error fetching reminders:', error);
        throw error; // Rethrow the error to be handled by SvelteKit's error handling
    }
};
