<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';

	let creditsModalOpen = false;
	let helpModalOpen = false;
	let gameOverModalOpen = false;
	let gameOverShownOnce = false;

	if (Object.keys($gameState.finishedPaintings).length == 16 && !gameOverShownOnce) {
		gameOverModalOpen = true;
		gameOverShownOnce = true;
	}
</script>

<div class="bg-grass h-screen">
	<div class="museum">
		<div class="lobby text-2xl px-8">
			<div>
				<h2 class="font-headings text-white text-center mt-28">Lobby</h2>
				<div class="text-center w-100 text-white">Total points: {$gameScore}</div>
			</div>
			<span class="mt-16 p-1">&nbsp;</span><!-- TODO HACK -->
			<button class="" on:click={() => (creditsModalOpen = true)}>Credits</button>
			<div class="mt-8 w-3/4 self-center text-sm text-white">
				Play some lobby tunes:
				<audio class="w-full" controls src="../audio/song-5.mp3" loop>
					<a href="../audio/song-5.mp3">background music</a>
				</audio>
			</div>
			<button class="mt-28" on:click={() => (helpModalOpen = true)}>Help</button>
		</div>
		{#each wings as wing, i}
			<div class="wing wing-{i + 1}">
				{#if $gameScore >= wing.unlockReq}
					<div class="paintings">
						{#each wing.paintings as painting}
							{#if $gameState.finishedPaintings[painting]}
								<a href="../view/painting?painting={painting}" class="painting">
									<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
								</a>
							{:else}
								<a class="painting" href="../create/select?wing={i}">
									<span class="placeholder">?</span>
								</a>
							{/if}
						{/each}
					</div>
					<h2 class="w-full mt-24 text-center font-headings text-3xl text-white">{wing.name}</h2>
				{:else}
					<div class="closed-content">
						<span class="text-4xl mt-20">Closed</span>
						<span>Unlocks at {wing.unlockReq} points</span>
						<h2 class="font-headings text-3xl mt-4">{wing.name}</h2>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<Modal bind:open={creditsModalOpen}>
	<div slot="title" class="font-headings text-4xl">Credits</div>
	<div slot="body" class="flex flex-col gap-2">
		<p>Art and music by <a target="_blank" href="https://kristinamay.itch.io">kristinamay</a></p>
		<p>Code by bkelly</p>
		<p>All paintings in the public domain via metmuseum.org, artic.edu, and nga.gov.</p>
	</div>
</Modal>

<Modal bind:open={helpModalOpen}>
	<div slot="title" class="font-headings text-4xl">Help</div>
	<div slot="body">
		<p>To view, edit, or create paintings, click on the paintings in each wing.</p>
		<p>
			(If you can't see the wings, your screen is too narrow! scroll down or widen your screen!)
		</p>
	</div>
</Modal>

<Modal bind:open={gameOverModalOpen}>
	<div slot="title" class="font-headings text-4xl">You did it!</div>
	<div slot="body">
		<p>
			You've successfully completed each of the paintings with a total combined score of {$gameScore}.
		</p>
		<p>If you'd like, you can continue playing to try to raise your score!</p>
		<p>And please, share your art with us in the comments!</p>
		<p class="text-2xl mt-8">Thank you so much for playing our game!</p>
	</div>
</Modal>

<style lang="postcss">
	.museum {
		@apply lg:grid lg:grid-flow-dense lg:justify-center lg:items-start
			flex flex-col overflow-auto items-center gap-y-5;
		grid-template-columns: repeat(3, minmax(auto, max-content));
		grid-template-rows: 282px; /* TODO hardcoded */

		background-image: url('/sprites/grass.png');
	}

	.lobby {
		@apply bg-no-repeat row-span-2
			flex flex-col;
		background-image: url('/sprites/lobby.png');
		grid-column: 2;
		min-height: 840px;
		width: 264px;
	}

	.wing {
		@apply bg-no-repeat relative py-[16px];
		min-height: 282px;
		width: 432px;
		margin-top: 20px;
	}

	.paintings {
		@apply flex gap-3 pl-6;
	}

	.wing:nth-child(even) .paintings {
		@apply pl-[60px];
	}

	.wing-1 {
		background-image: url('/sprites/wing-1.png');
	}

	.wing-2 {
		background-image: url('/sprites/wing-2.png');
	}

	.wing-3 {
		background-image: url('/sprites/wing-3.png');
	}

	.wing-4 {
		background-image: url('/sprites/wing-4.png');
	}

	.painting {
		@apply inline-flex w-auto mt-0.5
			items-center justify-center
			border-none rounded-none bg-transparent
			hover:bg-slate-500;
		height: 84px;
		width: 78px;
	}

	.painting img,
	.painting .placeholder {
		@apply w-auto h-full max-w-full inline-block border-2 bg-white border-yellow-600;
		border-style: inset;
	}

	.painting .placeholder {
		@apply bg-slate-700 w-full text-5xl leading-none flex flex-col items-center justify-center;
	}

	.closed-content {
		@apply absolute top-0 left-0 w-full h-full
			backdrop-grayscale backdrop-brightness-50
			flex items-center justify-center flex-col
			text-white;
	}
</style>
