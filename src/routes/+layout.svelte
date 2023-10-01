<script lang="ts">
	import '../app.css';
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { gameState } from '$lib/gameState';
</script>

<slot />

<DebugOnly disabled>
	<div class="my-16 mx-4 p-4 border rounded bg-white">
		<div>DEBUG</div>
		<button
			on:click|preventDefault={() => {
				localStorage.clear();
				document.location.reload();
			}}>Clear data</button
		>
		<pre>{JSON.stringify(
				{
					...$gameState,
					finishedPaintings: Object.keys($gameState.finishedPaintings)
				},
				null,
				4
			)}</pre>
	</div>
</DebugOnly>
