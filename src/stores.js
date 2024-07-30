import { writable } from 'svelte/store';

export const selectedReminder = writable({});


export const toastMessage = writable('');
export const toastStatus = writable(''); 