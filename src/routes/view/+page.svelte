<script lang="ts">
	import { wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';
</script>

<div class="museum">
	<div class="lobby text-2xl px-8">
		<div>
			<h2 class="font-headings text-white text-center mt-28">Lobby</h2>
			<div class="text-center w-100 text-white">Total points: {$gameScore}</div>
		</div>
		<a href="/TODO" class="mt-28">Hall of Fame</a>
		<a href="/TODO" class="mt-48">View Credits</a>
		<a href="/TODO" class="mt-28">View Help</a>
	</div>
	{#each wings as wing, i}
		<div class="wing wing-{i+1}">
			{#if $gameScore >= wing.unlockReq}
				<div class="flex align-top ml-11">
					{#each wing.paintings as painting}
						{#if $gameState.finishedPaintings[painting]}
							<a href="/view/painting?painting={painting}" class="painting">
								<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
							</a>
							{:else}
							<a class="painting p-2 " href="/create/select?wing={i}">New</a>
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

<style>
	.museum {
		@apply grid grid-flow-dense;
		grid-template-columns: repeat(3, minmax(0, max-content));
		margin: 24px 0 0 24px;
	}

	.lobby {
		@apply bg-no-repeat row-span-2
			flex flex-col;
		background-image: url('/sprites/lobby.png');
		grid-column: 2;
		height: 840px;
		width: 264px;
	}

	.wing {
		@apply p-4 bg-no-repeat relative;
		height: 282px;
		width: 432px;
		padding: 18px 32px;
		z-index: -10;
		margin-top:20px;
	}

	.wing-1 {
		background-image: url('/sprites/wing-1.png');
	}

	.wing-2 {
		background-image: url('/sprites/wing-2.png');
	}

	.wing-3 {
		background-image: url('/sprites/wing-3.png');
		margin-top:-180px;
	}

	.wing-4 {
		background-image: url('/sprites/wing-4.png');
		margin-top:-180px;
	}

	.painting {
		@apply inline-block w-auto mt-0.5;
		height: 80px;
		border: 2px #819796 solid;
		background-color: #c7cfcc;
		margin-right: 36px;
	}

	.painting img {
		max-width: unset;
		height: 100%;
	}

	.closed-content {
		@apply absolute top-0 left-0 w-full h-full
			backdrop-grayscale backdrop-brightness-50
			flex items-center justify-center flex-col
			text-white;
	}
</style>
