<script>

	import CountdownTimer from "$lib/CountdownTimer.svelte";
	import Create from "$lib/Create.svelte";
    export let data;
    console.log(data)
    const { formattedReminders } = data;

</script>

<Create />

<section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Reminder
                    </button>
                </div>
            </div>
            
            {#if formattedReminders.length > 0}
                <div class="overflow-x-auto">
                    <div class="flex flex-col text-left text-gray-500">
                        <div class="text-xm text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex flex-wrap">
                            <div class="w-full sm:w-1/3 border border-blue-200 px-4 py-3 text-center font-bold">Name</div>
                            <div class="w-full sm:w-1/3 border border-red-200 px-4 py-3 text-center font-bold">Description</div>
                            <div class="w-full sm:w-1/3 border border-green-200 px-4 py-3 text-center font-bold">Countdown</div>
                        </div>
                        
                        {#each formattedReminders as reminder}
                            <div class="flex flex-wrap">
                                <div class="w-full sm:w-1/3 border border-blue-200 px-4 py-3 text-center">
                                    {reminder.name}
                                </div>
                                <div class="w-full sm:w-1/3 border border-red-200 px-4 py-3 text-center">
                                    {reminder.description}
                                </div>
                                <div class="w-full sm:w-1/3 border border-green-200 px-4 py-3 text-center">
                                    <CountdownTimer targetDate={reminder.targetDate} />
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {:else}
                <p class="p-4 text-center">No reminders found.</p>
            {/if}
        </div>
    </div>
</section>
