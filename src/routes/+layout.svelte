<script lang="ts">
	import '../app.css';
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { gameState } from '$lib/gameState';
</script>

<slot />

<DebugOnly disabled>
	user id: {$gameState.userId}
</DebugOnly>
