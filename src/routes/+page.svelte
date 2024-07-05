<script>
    import { goto } from '$app/navigation'; // Correct import for `goto`

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

<button on:click={logout}>Logout</button>
