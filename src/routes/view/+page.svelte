<script lang="ts">
	import { wings } from '$lib/data';

	let currentPoints = 0; // TODO get from game state
</script>

<span>Total points: {currentPoints}</span>

<h1>Lobby</h1>
<div class="wing open">
	<a href="/TODO">go to hall of fame</a>
	<a href="/TODO">view instructions</a>
	<a href="/TODO">view credits</a>
</div>

{#each wings as wing, i}
	<h1>{wing.name}</h1>
	<div class="wing" class:open={currentPoints >= wing.unlockReq}>
		{#if currentPoints >= wing.unlockReq}
			{#each wing.paintings as painting}
				<!-- TODO only show the paintings the user has created already -->
				{painting}
			{/each}
			<a href="/create/select?wing={i}">Create new</a>
		{:else}
			<h2>Closed</h2>
			<span>Unlocks at {wing.unlockReq} points</span>
		{/if}
	</div>
{/each}

<style>
	.wing {
		padding: 12px;
		background-color: #a9a9a9;
	}

	.wing.open {
		background-color: #d9d9d9;
	}
</style>
