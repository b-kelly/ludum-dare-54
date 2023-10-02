<script lang="ts">
	import { wings, paintings, type Painting } from '$lib/data';
	import type { PageData } from '../$types';
	import { gameState, gameScore } from '$lib/gameState';

	export let data: PageData;

	let allPaintings: Painting[] = wings[data.wing].paintings.map((id) => paintings[id]);
</script>

<div class="container">
	<h1 class="text-3xl mb-4 text-center">
		Which painting would you like to recreate for your museum?
	</h1>

	{#each allPaintings as painting}
		<div class="font-headings text-2xl text-center">{painting.name} - {painting.artist}</div>
		<div class="flex flex-row justify-center gap-8">
			<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
			{#if $gameState.finishedPaintings[painting.id]}
				<div class="flex flex-col justify-between text-center">
					<p>Completed!</p>
					<p>Score: {$gameState.finishedPaintings[painting.id].score}</p>
					<a class="mb-12" href="/create/paint?painting={painting.id}">Edit</a>
				</div>
				<img
					class="full-painting"
					src={$gameState.finishedPaintings[painting.id].image}
					alt={painting.bugName}
				/>
			{:else}
				<div class="flex flex-col justify-between text-center">
					<p>(Not started)</p>
				</div>
				<a class="full-painting self-center" href="/create/paint?painting={painting.id}">Begin!</a>
			{/if}
		</div>
	{/each}
</div>

<style>
	.container {
		@apply flex flex-col bg-no-repeat bg-left-bottom gap-4 py-12;
		background-image: url('/sprites/bug.png');
	}

	.full-painting {
		@apply w-32 h-auto;
	}
</style>
