<script>
    import { toastMessage, toastStatus } from '../stores';
    import { onDestroy } from 'svelte';

    let message = '';
    let status = '';
    let isVisible = false;
    let timer;

    $: isSuccessful = status === 'successful';
    $: toastId = isSuccessful ? 'toast-success' : 'toast-danger';
    $: toastClass = isSuccessful 
        ? 'text-green-800 bg-green-300'
        : 'text-red-800 bg-red-300 dark:text-gray-400 dark:bg-gray-800';
    $: iconClass = isSuccessful
        ? 'text-green-500 bg-green-100'
        : 'text-red-500 bg-red-100';

    const unsubscribeMessage = toastMessage.subscribe(value => {
        clearTimeout(timer);
        message = value;
        if (value) {
            isVisible = true;
            timer = setTimeout(() => {
                isVisible = false;
                toastMessage.set('');
                toastStatus.set('');
            }, 3000);
        }
    });

    const unsubscribeStatus = toastStatus.subscribe(value => {
        status = value;
    });

    onDestroy(() => {
        unsubscribeMessage();
        unsubscribeStatus();
        clearTimeout(timer);
    });
</script>

{#if isVisible}
<div id={toastId} class="fixed bottom-5 z-10 right-5 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow {toastClass}" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg {iconClass}">
        {#if isSuccessful}
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Check icon</span>
        {:else}
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span class="sr-only">Error icon</span>
        {/if}
    </div>
    <div class="ms-3 text-sm font-normal">{message}</div>
</div>
{/if}
