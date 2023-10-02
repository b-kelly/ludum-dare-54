<script lang="ts">
	import { paintings, type Painting } from '$lib/data';
	import type { FinishedPainting } from '$lib/gameState';
	import { getCriticReview } from '$lib/image';

	export let painting: string;
	export let playerPainting: FinishedPainting;
</script>

<div class="container">
	<img src="/sprites/bug.png" class="self-end mb-4 ml-4 hidden lg:block" alt="bug artiste" />

	<div class="">
		<div class="flex flex-col gap-1">
			<img src={playerPainting.image} alt={painting} class="bg-canvas-bg p-2" />
			<div class="bg-yellow-600 text-white text-center">
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
		<div class="bg-critics text-white p-4">
			<div class="font-headings">Critics are saying:</div>
			<div>"{getCriticReview(playerPainting.score)}"</div>

			<div>Score: {playerPainting.score || 0}</div>
		</div>

		<a href="/create/paint?painting={painting}">Edit Painting</a>
		<a href="/view">Return to Museum</a>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply bg-museum-review bg-cover bg-no-repeat
			flex flex-col md:flex-row gap-8 min-h-screen pt-8 px-4;
	}
</style>
