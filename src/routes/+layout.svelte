<script lang="ts">
	import '../app.css';
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { gameState } from '$lib/gameState';
</script>

<slot />

<DebugOnly>
	user id: {$gameState.userId}
</DebugOnly>
