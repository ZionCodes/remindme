// Import necessary modules and components
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { toastMessage, toastStatus } from '../../stores';

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
        // console.log('Formatted Reminders:', formattedReminders);

        // Return formatted reminders to be passed to page.svelte
        return {
            formattedReminders,
        };

    } catch (error) {
        console.error('Error fetching reminders:', error);
        throw error; // Rethrow the error to be handled by SvelteKit's error handling
    }
};

export const actions = {
    create: async ({ request, locals }) => {
        try {
            // Initialize PocketBase instance and authenticate
            const pb = new PocketBase('https://drove-rain.pockethost.io/');
            await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

            // Parse form data
            const formData = await request.formData();

            // Extract form fields and user ID
            const name = formData.get('name');
            const description = formData.get('description');
            const date = formData.get('date');
            const field = locals.user.id;
            const offset = formData.get('offset');

            // Construct reminder object
            const reminder = {
                name,
                description,
                date,
                field,
                offset
            };

            // Create a new reminder record in PocketBase
            const record = await pb.collection('reminder').create(reminder);

             // Set success toast message
             toastMessage.set('Reminder created successfully');
             toastStatus.set('successful');

            // Return the created record or ID
            return {
                status: 200,
                body: record
            };

        } catch (error) {
            console.error('Error creating reminder:', error);
            toastMessage.set('Failed to create reminder.');
            toastStatus.set('error');
            // Return error response
            return {
                status: 500,
                body: { error: 'Failed to create reminder.' }
            };
        }
    },

    update: async ({ request, locals }) => {
        try {
            // Initialize PocketBase instance and authenticate
            const pb = new PocketBase('https://drove-rain.pockethost.io/');
            await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

            // Parse form data
            const formData = await request.formData();
            console.log(formData);

            // Extract form fields and user ID
            const id = formData.get('id')
            const name = formData.get('name');
            const description = formData.get('description');
            const date = formData.get('date');
            const field = locals.user.id;

            // Construct reminder object
            const reminder = {
                id,
                name,
                description,
                date,
                field
            };

            // Update reminder in PocketBase
            const record = await pb.collection('reminder').update(id, reminder);
            // Set success toast message
            toastMessage.set('Reminder updated successfully');
            toastStatus.set('successful');

            // Return the created record or ID
            return {
                status: 200,
                body: record
            };
        }
        catch (error) {
            console.error('Error updating reminder:', error);
            // Set error toast message
            toastMessage.set('Failed to update reminder.');
            toastStatus.set('error');
            return {
                status: 500,
                body: { error: 'Failed to create reminder.'}
            }
        }
    },

    delete: async ({ request }) => {
        try {
            // Initialize PocketBase instance and authenticate
            const pb = new PocketBase('https://drove-rain.pockethost.io/');
            await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

            // Parse form data
            const formData = await request.formData();
            // Set success toast message
            toastMessage.set('Reminder deleted successfully');
            toastStatus.set('successful');

            // Extract form fields and user ID
            const id = formData.get('id');

            // Delete reminder in PocketBase
            await pb.collection('reminder').delete(id);

            return {
                status: 200,
                body: { message: 'Reminder deleted successfully.' }
            };
        }
        catch (error) {
            console.error('Error deleting reminder:', error);
            // Set error toast message
            toastMessage.set('Failed to delete reminder.');
            toastStatus.set('error');
            return {
                status: 500,
                body: { error: 'Failed to delete reminder.' }
            };
        }
    }
};




