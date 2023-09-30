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

<div class="bg-museum-paint bg-cover bg-no-repeat flex flex-row">

	<div class="p-6 flex flex-col h-screen justify-between">
		<Grid dimensions={currentPainting} multiplier={MULT} disabled>
			<img
				class="full-painting min-w-max"
				src="/paintings/{currentPainting.id}_full.jpg"
				alt={currentPainting.name}
				style:--height={cHeight}
				style:--width={cWidth}
			/>
		</Grid>
		<img src="/sprites/bug.png" class="min-w-max hidden md:block" alt="bug artiste" />
	</div>

	<div class="pb-12">

		<img src="/sprites/easel.png" alt="easel" class="absolute mt-12 z-0"/>
		<Grid dimensions={currentPainting} multiplier={MULT} class="border border-gray-500 absolute mt-24 ml-12 bg-canvas-bg">
			<Canvas
				bind:this={canvas}
				initialImage={finishedPainting}
				dimensions={currentPainting}
				multiplier={MULT}
				{currentColor}
			/>
		</Grid>

		<div class="absolute mt-1 p-2 ml-2 bg-easel-fore border-b-4 border-b-easel-back">
			{#each currentPainting.palette as color}
				<button
					class="swatch ml-1 rounded-full"
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

		<button type="button" class="absolute bottom-24 w-36 ml-24 bg-slate-700 text-white" on:click={startScoring}>Submit</button>

	</div>

</div>

{:else if step === 'scoring'}

<div class="bg-museum-review bg-cover bg-no-repeat flex flex-row h-screen">

	<img src="/sprites/bug.png" class="hidden md:block self-end mb-4 ml-4" alt="bug artiste" />

	<div class="pb-12 ml-24 md:ml-0">

		<img src={finishedPainting} alt="finished painting" class="absolute mt-36 sm:mt-16 bg-canvas-bg p-2"/>

		<div class="absolute bottom-24 gap-y-4 flex flex-col ml-12">
			<button type="button" class="bg-slate-400 text-white" on:click={editPainting}>Edit painting</button>
			<button type="button" class="bg-slate-700 text-white" on:click={savePainting}>Hang in museum!</button>
		</div>

	</div>

	<div class="absolute top-0 w-screen sm:right-0 sm:top-24 p-2 sm:w-3/12 bg-critics text-white">
		<div class="">Critics are saying:</div>
		<div>Todo: write misc things for critics to say based on feedback and style this div</div>

		<div>Score: {finalScore}</div>
	</div>


</div>

{/if}



<style>
	.full-painting {
		width: calc(var(--width) * .5px);
		height: calc(var(--height) * .5px);
	}

	.swatch {
		@apply w-8 h-8 p-2;
		background-color: var(--color);
	}

	.swatch.current {
		@apply outline outline-red-600;
	}
</style>
