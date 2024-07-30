<script>
    import { goto } from '$app/navigation';
    import { fade, blur } from 'svelte/transition' // Correct import for `goto`

    async function logout() {
        const response = await fetch('/logout', {
            method: 'POST'
        });

        if (response.ok) {
            // Redirect to the login page after successful logout
            goto('/login');
        } else {
            console.error('Failed to log out');
        }
    }
</script>

<div in:fade out:blur>
    <button on:click={logout}>Logout</button>
</div>

