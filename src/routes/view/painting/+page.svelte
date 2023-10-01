<script lang="ts">
	import { paintings } from '$lib/data';
	import { gameState } from '$lib/gameState';
	import type { PageData } from './$types';

	export let data: PageData;

	$: playerPainting = $gameState.finishedPaintings[data.painting];

</script>

<div class="bg-museum-review bg-cover bg-no-repeat flex flex-row h-screen">
	<img src="/sprites/bug.png" class="hidden md:block self-end mb-4 ml-4" alt="bug artiste" />

	<div class="pb-12 ml-24 md:ml-0">
		<div class="absolute mt-36 sm:mt-16 flex flex-col">
			<img src={playerPainting.image} alt={data.painting} class="bg-canvas-bg p-2" />
			<div class="bg-yellow-600 text-white p-1 mt-1 w100 text-center">
				{paintings[data.painting].bugName} - adapted by Bug
			</div>
			<div class="bg-yellow-700 text-white p-1 mt-1 w100 text-center">Based on "{paintings[data.painting].name}"
			</div>
			<div class="bg-yellow-700 text-white pb-1 mt-0 w100 text-center">by {paintings[data.painting].artist}
			</div>

			<a class="mt-24 mb-8" href="/create/paint?painting={data.painting}">Edit Painting</a>
			<a href="/view">Return to Museum</a>
		</div>
	</div>

	<div class="absolute top-0 w-screen sm:right-0 sm:top-24 p-2 sm:w-3/12 bg-critics text-white">
		<div class="">Critics are saying:</div>
		<div>Todo: write misc things for critics to say based on feedback and style this div</div>

		<div>Score: {playerPainting.score || 0}</div>
	</div>
</div>
