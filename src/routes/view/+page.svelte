<script lang="ts">
	import { paintings, wings } from '$lib/data';
	import { gameState, gameScore } from '$lib/gameState';
</script>

<div class="bg-green-800 w-screen h-screen absolute -z-10">

	<img src="/sprites/museum.png" alt="museum overhead view" class="absolute w-min"/>
	<img src="/sprites/closed-wing-2.png" alt="museum overhead view" class="absolute w-min"/>
	<img src="/sprites/closed-wing-3.png" alt="museum overhead view" class="absolute w-min"/>
	<img src="/sprites/closed-wing-4.png" alt="museum overhead view" class="absolute w-min"/>

</div>

	<span>Total points: {$gameScore}</span>

	<h2 class="bm-page-title w-screen text-center -mt-4">Lobby</h2>
	<div class="">
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
							<a href="/view/painting?painting={painting}" class="painting">
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
		@apply p-4;
	}

	.painting {
		@apply w-16 h-auto border border-black;
	}
</style>
