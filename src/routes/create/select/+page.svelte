<script lang="ts">
	import { wings, paintings, type Painting } from '$lib/data';
	import type { PageData } from '../$types';

	export let data: PageData;

	let allPaintings: Painting[] = wings[data.wing].paintings.map((id) => paintings[id]);
</script>

<div class="bg-slate-900 w-screen h-screen text-white flex flex-col justify-center bg-bug bg-no-repeat bg-left-bottom">
	<h1 class="bm-page-title mb-4">Which painting would you like to recreate for your museum?</h1>

	{#each allPaintings as painting}
		<a href="/create/paint?painting={painting.id}">
			<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
			{painting.name}
		</a>
	{/each}

</div>

<style>
	.full-painting {
		@apply w-52 h-auto;
	}
</style>
