<script lang="ts">
	import { wings, paintings, type Painting } from '$lib/data';
	import type { PageData } from '../$types';
	import { gameState, gameScore } from '$lib/gameState';

	export let data: PageData;

	let allPaintings: Painting[] = wings[data.wing].paintings.map((id) => paintings[id]);

</script>

<div class="bg-slate-900 text-white flex flex-col bg-bug bg-no-repeat bg-left-bottom gap-4 p-12">
	<h1 class="bm-page-title mb-4">Which painting would you like to recreate for your museum?</h1>

	{#each allPaintings as painting}
		{#if $gameState.finishedPaintings[painting.id]}
		<div class="font-headings text-2xl text-center">{painting.name} - {painting.artist}</div>
			<div class="flex flex-row justify-center gap-4">
				<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
				<div class="flex flex-col justify-between text-center">
					<p>Completed!</p>
					<p>Score: {$gameState.finishedPaintings[painting.id].score}</p>
					<a class="mb-12" href="/create/paint?painting={painting.id}">Edit</a>
				</div>
				<img class="full-painting" src="{$gameState.finishedPaintings[painting.id].image}" alt={painting.bugName} />
			</div>
		{:else}
		<div class="font-headings text-2xl text-center">{painting.name} - {painting.artist}</div>
		<div class="flex flex-row justify-center">
			<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
			<div class="flex flex-col justify-between text-center px-4">
				<p>(Not started)</p>
			</div>
			<a class="full-painting self-center" href="/create/paint?painting={painting.id}">Begin!</a>
		</div>
		{/if}
	{/each}

</div>

<style>
	.full-painting {
		@apply w-32 h-auto;
	}
</style>
