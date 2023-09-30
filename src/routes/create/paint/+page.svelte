<script lang="ts">
	import Workspace from '$lib/Workspace.svelte';
	import { paintings, type Painting } from '$lib/data';
	import type { PageData } from './$types';

	export let data: PageData;

	let step: 'create' | 'scoring' = 'create';
	let currentPainting: Painting = paintings[data.painting];

	function startScoring(image: string) {
		alert('TODO ' + image);
	}
</script>

{#if step === 'create'}
	<Workspace painting={currentPainting} on:finish={(e) => startScoring(e.detail.image)} />
{:else if step === 'scoring'}
	asdf
{/if}
