<script>
    import CountdownTimer from "$lib/CountdownTimer.svelte";
    import { selectedReminder } from "../../stores";
    import EditModal  from "$lib/EditModal.svelte";
	  import DeleteModal from "$lib/DeleteModal.svelte";
	  import Toast from "$lib/Toast.svelte";
    import CreateModal from "$lib/CreateModal.svelte";
  

    export let data;
    const { formattedReminders } = data;

    const showModal = (reminder) => {
    selectedReminder.set(reminder);
  };

</script>

<CreateModal/>
<EditModal />
<DeleteModal />
<Toast />

<section class="bg-gray-50 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-lg px-4 lg:px-12">
        <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button id="createModal" data-modal-target="createModal"  data-modal-toggle="createModal" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Reminder
                    </button>
                </div>
            </div>

            {#if formattedReminders.length > 0}
                <div class="overflow-x-auto">
                    <div class="flex flex-col text-left text-gray-500">
                        <ul class='mb-12 w-full' id="reminders">
                            {#each formattedReminders as reminder}
                            <a href="/reminder/{reminder.id}">
                              <li class="relative">
                                <div
                                class="relative flex flex-col sm:flex-row px-3 justify-between gap-x-6 py-5 border border-gray-200 mb-3 rounded-lg flex-wrap mx-auto hover:bg-teal-50 items-center">
                                  <div class="w-full sm:w-auto text-left sm:text-left flex min-w-0 flex-1 gap-x-4 mb-4 sm:mb-0 items-center">
                                    <div class="min-w-0 flex-auto">
                                      <p class="md:text-sm leading-6 text-gray-700 font-bold mt-px max-w-xs">{reminder.name}</p>
                                      <p class="md:text-sm leading-6 text-gray-700 mt-px max-w-lg">{reminder.description}</p>
                                    </div>
                                  </div>
                                  <div class="flex sm:hidden items-center justify-center w-full">
                                    <hr class="w-64 h-1 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700">
                                    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                                      <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                      </svg>                                      
                                    </div>
                                  </div>
                                  <div class="flex flex-col text-sm leading-6 text-gray-900 sm:flex-col-reverse items-center">
                                    <span class="text-gray-900 text-sm flex"><CountdownTimer targetDate={reminder.targetDate} offset={reminder.offset} /></span>
                                  </div>
                                  <!-- <button 
                                  id="updateProductButton" 
                                  data-modal-target="updateProductModal" 
                                  data-modal-toggle="updateProductModal" tabindex="0" 
                                  on:click={() => showModal(reminder)} 
                                  on:keydown={(e) => e.key === 'Enter' && showModal(reminder)} type="button" class="text-gray-700 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm me-2 mb-2"><svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                  </svg>
                                  </button> -->
                                </div>
                              </li>
                            </a>
        
                              
                            {/each}
                        </ul>
                    </div>
                </div>
            {:else}
                <p class="p-4 text-center">No reminders found.</p>
            {/if}
        </div>
    </div>
</section>





