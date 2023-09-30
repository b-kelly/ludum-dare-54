<script lang="ts">
	import paintings from '$lib/paintings.json';
	import Workshop from '$lib/Workshop.svelte';
	import type { Painting } from '$lib';

	let currentPainting: Painting = paintings[0];
</script>

<select bind:value={currentPainting}>
	{#each paintings as painting}
		<option value={painting}>{painting.name}</option>
	{/each}
</select>

{#if currentPainting}
	<Workshop painting={currentPainting} />
{/if}
