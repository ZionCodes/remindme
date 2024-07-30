<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let targetDate; // Accept the target date as a prop

  let days = writable(0);
  let hours = writable(0);
  let minutes = writable(0);
  let seconds = writable(0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;
    console.log(distance)

    days.set(Math.floor(distance / (1000 * 60 * 60 * 24)));
    hours.set(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    minutes.set(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    seconds.set(Math.floor((distance % (1000 * 60)) / 1000));
  }

  onMount(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="flex justify-center text-gray-500 items-center h-full">
  <div class="grid auto-cols-max grid-flow-col gap-5 text-center text-l">
    <div class="flex flex-col text-center">
      <span class="countdown font-mono">
        {$days}
      </span>
      days
    </div>
    <div class="flex flex-col text-center">
      <span class="countdown font-mono">
        {$hours}
      </span>
      hours
    </div>
    <div class="flex flex-col text-center">
      <span class="countdown font-mono">
        {$minutes}
      </span>
      min
    </div>
    <div class="flex flex-col text-center">
      <span class="countdown font-mono">
        {$seconds}
      </span>
      sec
    </div>
  </div>
</div>
