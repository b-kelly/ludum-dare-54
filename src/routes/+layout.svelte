<script lang="ts">
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { gameState } from '$lib/gameState';
</script>

<slot />

<DebugOnly>
	user id: {$gameState.userId}
</DebugOnly>
