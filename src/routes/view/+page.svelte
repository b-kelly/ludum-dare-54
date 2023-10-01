<script lang="ts">
	import { paintings, wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';
</script>

<div class="bg-gray-900 w-screen h-screen absolute -z-10">
	<div class="flex">
		<img src="/sprites/museum.png" alt="museum overhead view" class="" />
		<img src="/sprites/closed-wing-2.png" alt="museum overhead view" class="absolute w-min" />
		<img src="/sprites/closed-wing-3.png" alt="museum overhead view" class="absolute w-min" />
		<img src="/sprites/closed-wing-4.png" alt="museum overhead view" class="absolute w-min" />
	</div>
</div>

<span>Total points: {$gameScore}</span>
<h2 class="bm-page-title w-screen text-center">Lobby</h2>
<div class="flex flex-col w-screen content-center justify-start gap-8 h-screen">
	<div class="flex flex-row w-screen">
		{#each wings as wing, i}
			<div class="wing flex flex-col w-1/2 flex-shrink-0" class:open={$gameScore >= wing.unlockReq}>
				{#if $gameScore >= wing.unlockReq}
					<div class="flex flex-row w-full gap-4 mb-8 justify-center">
						{#each wing.paintings as painting}
							{#if $gameState.finishedPaintings[painting]}
								<a href="/view/painting?painting={painting}" class="painting">
									<img src={$gameState.finishedPaintings[painting].image} alt={painting} />
								</a>
							{/if}
						{/each}
						<a href="/create/select?wing={i}">New</a>
					</div>
					<h2 class="bm-page-title self-center">{wing.name}</h2>
				{:else}
					<span class="text-xl self-center">Closed</span>
					<h2 class="bm-page-title self-center">{wing.name}</h2>
					<span class="self-center">Unlocks at {wing.unlockReq} points</span>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col">
		<a href="/TODO" class="w-screen text-center">go to hall of fame</a>
		<a href="/TODO" class="w-screen text-center">view credits</a>
		<a href="/TODO" class="w-screen text-center">view help</a>
	</div>
</div>

<style>
	.wing {
		@apply p-4;
	}

	.painting {
		@apply w-16 h-auto border border-black;
	}
</style>
