<script lang="ts">
	import { paintings, wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';
</script>

<span>Total points: {$gameScore}</span>

<h2 class="bm-page-title">Lobby</h2>
<div class="wing open">
	<a href="/TODO">go to hall of fame</a>
	<a href="/TODO">view instructions</a>
	<a href="/TODO">view credits</a>
</div>

{#each wings as wing, i}
	<h2 class="bm-page-title">{wing.name}</h2>
	<div class="wing" class:open={$gameScore >= wing.unlockReq}>
		{#if $gameScore >= wing.unlockReq}
			<div class="flex gap-4">
				{#each wing.paintings as painting}
					{#if $gameState.finishedPaintings[painting]}
						<a href="/create/paint?painting={painting}" class="painting">
							<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
						</a>
					{/if}
				{/each}
				<a href="/create/select?wing={i}">Create new</a>
			</div>
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

	.painting {
		@apply w-16 h-auto border border-black;
	}
</style>
