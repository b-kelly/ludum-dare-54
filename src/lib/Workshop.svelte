<script lang="ts">
	import type { Painting } from '$lib/data';
	import Canvas from './Canvas.svelte';

	export let painting: Painting;

	let currentColor: string | undefined;

	$: cHeight = painting.height * 10;
	$: cWidth = painting.width * 10;
</script>

<div class="container">
	<Canvas {painting} {currentColor} />
	<img
		class="full-painting"
		src="/paintings/{painting.id}_full.jpg"
		alt={painting.name}
		style:--height={cHeight}
		style:--width={cWidth}
	/>
</div>

<div class="color-swatches">
	{#each painting.palette as color}
		<button class="swatch" on:click={() => (currentColor = color)} style:--color={color} />
	{/each}
</div>

<span style:color={currentColor}>currentColor: {currentColor}</span>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.full-painting {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
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
