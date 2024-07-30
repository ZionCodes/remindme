<!-- src/lib/ReminderModal.svelte -->
<script>
    import CountdownTimer from "$lib/CountdownTimer.svelte";
    import { modalVisible, selectedReminder } from "../stores";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
  
    let modal;
  
    onMount(() => {
      modal = document.getElementById('readProductModal');
      const unsubscribe = modalVisible.subscribe(value => {
        if (value) {
          modal.style.display = 'flex';
        } else {
          modal.style.display = 'none';
        }
      });
  
      return unsubscribe;
    });
  </script>
  
  <div id="readProductModal" class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden" style="display: none;">
    <div class="bg-white rounded-lg shadow-lg w-1/2 mx-4 md:mx-0 p-6">
      <div class="flex justify-between items-center p-4 border-b">
        <h5 class="text-xl font-medium">Reminder Details</h5>
        <button id="readProductButton" class="text-black" on:click={() => modalVisible.set(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="p-4">
        {#if $selectedReminder}
          <p>Name: {$selectedReminder.name}</p>
          <p>Description: {$selectedReminder.description}</p>
          <p>Countdown: <CountdownTimer targetDate={$selectedReminder.targetDate} /></p>
        {:else}
          <p>No reminder selected.</p>
        {/if}
      </div>
      <div class="flex justify-end p-4 border-t">
        <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={() => modalVisible.set(false)}>Close</button>
      </div>
    </div>
  </div>
  
  <style>
    #readProductModal {
      display: none;
    }
  </style>
  