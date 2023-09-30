<script lang="ts">
	import '../app.css';
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { gameState } from '$lib/gameState';
</script>

<slot />

<DebugOnly>
	<pre>{JSON.stringify(
			{
				...$gameState,
				finishedPaintings: Object.keys($gameState.finishedPaintings)
			},
			null,
			4
		)}</pre>
</DebugOnly>
