<script lang="ts">
	import Workshop from '$lib/Workshop.svelte';
	import { wings, paintings, type Painting } from '$lib/data';
	import type { PageData } from '../$types';

	export let data: PageData;

	let allPaintings: Painting[] = wings[data.wing].paintings.map((id) => paintings[id]);
</script>

<h1>Which painting would you like to recreate for your museum?</h1>

{#each allPaintings as painting}
	<a href="/create/paint?painting={painting.id}">
		<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
		<br />
		{painting.name}
	</a>
{/each}

<style>
	.full-painting {
		width: 200px;
		height: auto;
	}
</style>
