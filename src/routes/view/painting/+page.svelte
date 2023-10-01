<script lang="ts">
	import { paintings } from '$lib/data';
	import { gameState } from '$lib/gameState';
	import type { PageData } from './$types';
	import { getCriticReview } from '$lib/image';

	export let data: PageData;

	$: playerPainting = $gameState.finishedPaintings[data.painting];
</script>

<div class="bg-museum-review bg-cover bg-no-repeat flex flex-row gap-8 min-h-screen pt-8 px-4">
	<img src="/sprites/bug.png" class="self-end mb-4 ml-4" alt="bug artiste" />

	<div class="pb-12 ml-24 md:ml-0">
		<div class="flex flex-col gap-1">
			<img src={playerPainting.image} alt={data.painting} class="bg-canvas-bg p-2" />
			<div class="bg-yellow-600 text-white text-center">
				{paintings[data.painting].bugName} - adapted by Bug
			</div>
			<div class="bg-yellow-700 text-white text-center">
				Based on "{paintings[data.painting].name}"
				<br />
				by {paintings[data.painting].artist}
			</div>
		</div>
	</div>

	<div>
		<div class="bg-critics text-white p-4">
			<div class="font-headings">Critics are saying:</div>
			<div>"{getCriticReview(playerPainting.score)}"</div>

			<div>Score: {playerPainting.score || 0}</div>
		</div>

		<a href="/create/paint?painting={data.painting}">Edit Painting</a>
		<a href="/view">Return to Museum</a>
	</div>
</div>
