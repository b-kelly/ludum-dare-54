<script lang="ts">
	import type { Painting } from '$lib/data';
	import { createEventDispatcher } from 'svelte';
	import Canvas from './Canvas.svelte';

	export let painting: Painting;

	const MULT = 10;

	const dispatch = createEventDispatcher<{
		finish: {
			image: string;
		};
	}>();

	let currentColor: string | undefined;

	$: cHeight = painting.height * MULT;
	$: cWidth = painting.width * MULT;

	function submit() {
		dispatch('finish', {
			image: 'TODO_finished_image'
		});
	}
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
		<button
			class="swatch"
			class:current={color === currentColor}
			on:click={() => (currentColor = color)}
			style:--color={color}
		/>
	{/each}
</div>

<button type="button" on:click={submit}>Submit</button>

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

	.swatch.current {
		outline: 2px solid red;
	}
</style>
