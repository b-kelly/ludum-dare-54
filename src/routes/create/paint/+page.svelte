<script lang="ts">
	import { goto } from '$app/navigation';
	import { paintings, type Painting } from '$lib/data';
	import { gameState } from '$lib/gameState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';
	import Canvas from '$lib/Canvas.svelte';
	import Grid from '$lib/Grid.svelte';

	export let data: PageData;

	let finishedPainting: string = '';
	let finalScore = 0;

	let step: 'create' | 'scoring' = 'create';
	let currentPainting: Painting = paintings[data.painting];

	let canvas: Canvas;

	const MULT = 16;

	let currentColor: string | undefined;

	$: cHeight = currentPainting.height * MULT;
	$: cWidth = currentPainting.width * MULT;

	onMount(() => {
		const existing = get(gameState).finishedPaintings[currentPainting.id];
		if (existing) {
			finishedPainting = existing.image;
			// TODO HACK! Don't use setTimeout at all (and try not to redraw manually anyways)
			window.setTimeout(() => {
				canvas.redraw();
			});
		}
	});

	function startScoring() {
		finishedPainting = canvas.getImage();
		// TODO score the image!
		finalScore = 100;
		step = 'scoring';
	}

	function editPainting() {
		step = 'create';
	}

	function savePainting() {
		gameState.update((gs) => {
			gs.finishedPaintings[currentPainting.id] = {
				image: finishedPainting,
				score: finalScore
			};

			return gs;
		});

		goto('/view');
	}
</script>

{#if step === 'create'}
	<div class="flex gap-3 select-none">
		<Grid dimensions={currentPainting} multiplier={MULT} class="border border-black">
			<Canvas
				bind:this={canvas}
				initialImage={finishedPainting}
				dimensions={currentPainting}
				multiplier={MULT}
				{currentColor}
			/>
		</Grid>
		<Grid dimensions={currentPainting} multiplier={MULT} disabled>
			<img
				class="full-painting"
				src="/paintings/{currentPainting.id}_full.jpg"
				alt={currentPainting.name}
				style:--height={cHeight}
				style:--width={cWidth}
			/>
		</Grid>
	</div>

	<div class="my-4 flex gap-2">
		{#each currentPainting.palette as color}
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

	<button type="button" on:click={startScoring}>Submit</button>
{:else if step === 'scoring'}
	<div>
		<div>art critic thoughts blah blah</div>
		<img src={finishedPainting} alt="finished painting" />
		<div>Score: {finalScore}</div>
	</div>

	<button type="button" on:click={editPainting}>Edit painting</button>
	<button type="button" on:click={savePainting}>Hang in museum!</button>
{/if}

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
