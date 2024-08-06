import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

// Define the load function to fetch a specific reminder
export const load = async ({ params, locals }) => {
    // Log the params and id for debugging
    console.log('Params:', params);
    console.log('Reminder ID:', params.id);

    // Check if the user is logged in
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    // Extract the reminder ID from the URL parameters
    const { id } = params;

    try {
        // Initialize PocketBase and authenticate
        const pb = new PocketBase('https://drove-rain.pockethost.io/');
        await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

        // Fetch the specific reminder by ID
        const reminder = await pb.collection('reminder').getOne(id);

        // Format the reminder data
        const formattedReminder = {
            name: reminder.name,
            description: reminder.description,
            id: reminder.id,
            targetDate: reminder.date,
            offset: reminder.offset
            // Add more fields as needed
        };

        // Return the formatted reminder to be passed to page.svelte
        return {
            reminder: formattedReminder
        };

    } catch (error) {
        console.error('Error fetching reminder:', error);
        throw error; // Rethrow the error to be handled by SvelteKit's error handling
    }
};
