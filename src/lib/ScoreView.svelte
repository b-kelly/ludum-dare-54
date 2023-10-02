<script lang="ts">
	import { goto } from '$app/navigation';
	import { paintings } from '$lib/data';
	import { gameState, type FinishedPainting } from '$lib/gameState';
	import { getCriticReview } from '$lib/image';

	export let painting: string;
	export let playerPainting: FinishedPainting;
	export let showSave = false;

	function savePainting() {
		gameState.update((gs) => {
			gs.finishedPaintings[painting] = {
				image: playerPainting.image,
				score: playerPainting.score
			};

			return gs;
		});

		goto('/view');
	}
</script>

<div class="score-container">
	<img src="/sprites/bug.png" class="self-end mb-4 ml-4 hidden md:block" alt="bug artiste" />

	<div class="md:-ml-36">
		<div class="flex flex-col gap-1 min-w-max max-w-sm">
			<img src={playerPainting.image} alt={painting} class="bg-canvas-bg p-2 self-center" />
			<div class="bg-yellow-600 text-white text-center px-2">
				{paintings[painting].bugName} - adapted by Bug
			</div>
			<div class="bg-yellow-700 text-white text-center">
				Based on "{paintings[painting].name}"
				<br />
				by {paintings[painting].artist}
			</div>
		</div>
	</div>

	<div>
		<div class="bg-[#3C5E8B] text-white p-4">
			<div class="font-headings">Critics are saying:</div>
			<div>"{getCriticReview(playerPainting.score)}"</div>

			<div>Score: {playerPainting.score || 0}</div>
		</div>

		<div class="flex flex-col mt-2 gap-1">
			{#if showSave}
				<button type="button" class="bg-slate-800" on:click={savePainting}>Save Painting</button>
			{:else}
				<a href="/create/paint?painting={painting}">Edit Painting</a>
				<a href="/view">Return to Museum</a>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.score-container {
		@apply bg-cover bg-no-repeat
			flex flex-col md:flex-row gap-8 min-h-screen pt-8 px-4;
		background-image: url('/sprites/background-review.png');
	}
</style>
