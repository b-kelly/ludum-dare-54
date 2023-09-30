<script lang="ts">
	import type { Painting } from '$lib/data';
	import { createEventDispatcher } from 'svelte';
	import Canvas from './Canvas.svelte';
	import Grid from './Grid.svelte';

	export let painting: Painting;
	let canvas: Canvas;

	const MULT = 16;

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
			image: canvas.getImage()
		});
	}
</script>

<div class="flex gap-3">
	<Grid dimensions={painting} multiplier={MULT} class="border border-black">
		<Canvas bind:this={canvas} dimensions={painting} multiplier={MULT} {currentColor} />
	</Grid>
	<Grid dimensions={painting} multiplier={MULT} disabled>
		<img
			class="full-painting"
			src="/paintings/{painting.id}_full.jpg"
			alt={painting.name}
			style:--height={cHeight}
			style:--width={cWidth}
		/>
	</Grid>
</div>

<div class="my-4 flex gap-2">
	{#each painting.palette as color}
		<button
			class="swatch"
			class:current={color === currentColor}
			on:click={() => (currentColor = color)}
			style:--color={color}
		/>
	{/each}
	<button
		class="swatch leading-none"
		class:current={'white' === currentColor}
		on:click={() => (currentColor = 'white')}
		style:--color={'white'}
	>
		&times;
	</button>
</div>

<button type="button" on:click={submit}>Submit</button>

<style>
	.full-painting {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}

	.swatch {
		@apply w-8 h-8;
		background-color: var(--color);
	}

	.swatch.current {
		@apply outline outline-red-600;
	}
</style>
