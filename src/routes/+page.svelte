<script lang="ts">
	import paintings from '$lib/paintings.json';
	import Canvas from '$lib/Canvas.svelte';
	import type { Painting } from '$lib';

	let currentPainting: Painting;
</script>

<select bind:value={currentPainting}>
	<option />
	{#each paintings as painting}
		<option value={painting}>{painting.name}</option>
	{/each}
</select>

{#if currentPainting}
	<Canvas painting={currentPainting} />
{/if}
