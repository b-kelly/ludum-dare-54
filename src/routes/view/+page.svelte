<script lang="ts">
	import { wings } from '$lib/data';
	import { gameState } from '$lib/gameState';
</script>

<span>Total points: {$gameState.score}</span>

<h2 class="bm-page-title">Lobby</h2>
<div class="wing open">
	<a href="/TODO">go to hall of fame</a>
	<a href="/TODO">view instructions</a>
	<a href="/TODO">view credits</a>
</div>

{#each wings as wing, i}
	<h2 class="bm-page-title">{wing.name}</h2>
	<div class="wing" class:open={$gameState.score >= wing.unlockReq}>
		{#if $gameState.score >= wing.unlockReq}
			{#each $gameState.finishedPaintings as painting}
				<!-- TODO only show the paintings the user has created already -->
				{painting}
			{/each}
			<a href="/create/select?wing={i}">Create new</a>
		{:else}
			<span class="text-xl">Closed</span>
			<span>Unlocks at {wing.unlockReq} points</span>
		{/if}
	</div>
{/each}

<style>
	.wing {
		@apply bg-neutral-400 p-4;
	}

	.wing.open {
		@apply bg-neutral-300;
	}
</style>
