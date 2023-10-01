<script lang="ts">
	import { wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';
</script>

<div class="museum">
	<div class="lobby">
		<h2>Lobby</h2>
		<span>Total points: {$gameScore}</span>
		<a href="/TODO">go to hall of fame</a>
		<a href="/TODO">view credits</a>
		<a href="/TODO">view help</a>
	</div>
	{#each wings as wing, i}
		<div class="wing">
			{#if $gameScore >= wing.unlockReq}
				<div class="flex align-top justify-evenly">
					{#each wing.paintings as painting}
						{#if $gameState.finishedPaintings[painting]}
							<a href="/view/painting?painting={painting}" class="painting">
								<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
							</a>
						{/if}
					{/each}
					<a class="painting p-2" href="/create/select?wing={i}">New</a>
				</div>
				<h2 class="w-full text-center text-2xl">{wing.name}</h2>
			{:else}
				<div class="closed-content">
					<span>Closed</span>
					<h2>{wing.name}</h2>
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
		background-image: url('/sprites/wing.png');
		height: 282px;
		width: 432px;
		padding: 18px 32px;
	}

	.wing:nth-child(odd) {
		background-image: url('/sprites/wing_flipped.png');
	}

	.painting {
		@apply inline-block w-auto mt-0.5;
		height: 80px;
		border: 2px #819796 solid;
		background-color: #c7cfcc;
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
