<script lang="ts">
	import Workshop from '$lib/Workshop.svelte';
	import { paintings, type Painting } from '$lib/data';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentPainting: Painting = paintings[data.painting];
</script>

{#if currentPainting}
	<Workshop painting={currentPainting} />
{/if}
