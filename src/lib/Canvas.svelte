<script lang="ts">
	import type { Painting } from '$lib';

	export let painting: Painting;
</script>

<div class="container">
	<canvas class="paint-canvas" />
	<img class="full-painting" src="/paintings/{painting.id}_full.jpg" alt={painting.name} />
</div>

<div class="color-swatches">
	{#each painting.palette as color}
		<div class="swatch" style:--color={color} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.paint-canvas {
		border: 1px solid black;
		width: 300px;
	}

	.full-painting {
		width: 300px;
		height: auto;
	}

	.color-swatches {
		margin-top: 12px;
		display: flex;
		gap: 6px;
	}

	.swatch {
		background-color: var(--color);
		height: 32px;
		width: 32px;
	}
</style>
