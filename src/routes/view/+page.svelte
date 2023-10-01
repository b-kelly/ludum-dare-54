<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';

	let creditsModalOpen = false;
	let helpModalOpen = false;
</script>

<div class="museum h-screen">
	<div class="lobby text-2xl px-8">
		<div>
			<h2 class="font-headings text-white text-center mt-28">Lobby</h2>
			<div class="text-center w-100 text-white">Total points: {$gameScore}</div>
		</div>
		<a href="/TODO" class="mt-28">Hall of Fame</a>
		<button class="mt-48" on:click={() => (creditsModalOpen = true)}>View Credits</button>
		<button class="mt-28" on:click={() => (helpModalOpen = true)}>View Help</button>
	</div>
	{#each wings as wing, i}
		<div class="wing wing-{i + 1}">
			{#if $gameScore >= wing.unlockReq}
				<div class="flex align-top {i == 0 || i == 2 ? 'ml-11' : 'ml-1'}">
					{#each wing.paintings as painting}
						{#if $gameState.finishedPaintings[painting]}
							<a href="/view/painting?painting={painting}" class="painting">
								<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
							</a>
						{:else}
							<a class="painting p-2" href="/create/select?wing={i}">New</a>
						{/if}
					{/each}
					<a class="painting p-2" href="/create/select?wing={i}">New</a>
				</div>
				<h2 class="w-full mt-24 text-center font-headings text-3xl text-white">{wing.name}</h2>
			{:else}
				<div class="closed-content">
					<span class="text-4xl">Closed</span>
					<h2 class="font-headings text-3xl">{wing.name}</h2>
					<span>Unlocks at {wing.unlockReq} points</span>
				</div>
			{/if}
		</div>
	{/each}
</div>

<Modal bind:open={creditsModalOpen}>
	<div slot="title">Credits</div>
	<div slot="body">foo</div>
</Modal>

<Modal bind:open={helpModalOpen}>
	<div slot="title">Help</div>
	<div slot="body">bar</div>
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
		@apply bg-no-repeat relative;
		min-height: 282px;
		width: 432px;
		padding: 18px 32px;
		margin-top: 20px;
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
		@apply inline-block w-auto mt-0.5;
		height: 80px;
		border: 2px #819796 solid;
		margin-right: 36px;
	}

	.painting img {
		max-width: unset;
		background-color: #c7cfcc;
		height: 100%;
	}

	.closed-content {
		@apply absolute top-0 left-0 w-full h-full
			backdrop-grayscale backdrop-brightness-50
			flex items-center justify-center flex-col
			text-white;
	}
</style>
