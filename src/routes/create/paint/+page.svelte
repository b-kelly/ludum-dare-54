<script lang="ts">
	import { goto } from '$app/navigation';
	import { paintings, type Painting } from '$lib/data';
	import { gameState } from '$lib/gameState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';
	import Canvas from '$lib/Canvas.svelte';
	import Grid from '$lib/Grid.svelte';
	import DebugOnly from '$lib/DebugOnly.svelte';
	import { getPixels, loadImageAsync, scoreImage } from '$lib/image';

	export let data: PageData;

	let finishedPainting: string = '';
	let finalScore: { match: number; total: number; score: number } | undefined;

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

	async function startScoring() {
		finishedPainting = canvas.getImage();
		// score the image
		finalScore = await scoreImage(
			finishedPainting,
			`/paintings/${currentPainting.id}_16.png`,
			currentPainting.width,
			currentPainting.height
		);
		step = 'scoring';
	}

	function editPainting() {
		step = 'create';
	}

	function savePainting() {
		gameState.update((gs) => {
			gs.finishedPaintings[currentPainting.id] = {
				image: finishedPainting,
				score: finalScore?.score || 0
			};

			return gs;
		});

		goto('/view');
	}
</script>

<div class="flex flex-col">
	{#if step === 'create'}
		<div class="flex flex-row">
			<img class="mr-36 mt-48" src="/sprites/bug.png" alt="bug with paintbrush" />
			<div class="flex select-none">
				<Grid dimensions={currentPainting} multiplier={MULT} disabled>
					<img
						class="full-painting mr-24 -ml-24"
						src="/paintings/{currentPainting.id}_full.jpg"
						alt={currentPainting.name}
						style:--height={cHeight}
						style:--width={cWidth}
					/>
				</Grid>
				<div class="flex flex-col">
					<Grid
						dimensions={currentPainting}
						multiplier={MULT}
						class="border border-black self-start"
					>
						<Canvas
							bind:this={canvas}
							initialImage={finishedPainting}
							dimensions={currentPainting}
							multiplier={MULT}
							{currentColor}
						/>
					</Grid>

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
							class:current={'transparent' === currentColor}
							on:click={() => (currentColor = 'transparent')}
							style:--color={'transparent'}
						>
							&times;
						</button>
					</div>
				</div>
			</div>
			<img src="/sprites/column.png" alt="marble column" class="-mt-4" />
		</div>

		<button type="button" class="self-end w-36 h-16 mr-40 mt-8" on:click={startScoring}
			>Submit</button
		>
		<DebugOnly>
			<Grid dimensions={currentPainting} multiplier={MULT}>
				<img
					class="full-painting pixelated"
					src="/paintings/{currentPainting.id}_16.png"
					alt={currentPainting.name}
					style:--height={cHeight}
					style:--width={cWidth}
				/>
			</Grid>
		</DebugOnly>
	{:else if step === 'scoring'}
		<div>
			<div>art critic thoughts blah blah</div>
			<img src={finishedPainting} alt="finished painting" />
			<div>{finalScore?.match} / {finalScore?.total} pixels match</div>
			<div>Score: {finalScore?.score || 0}</div>
		</div>

		<button type="button" on:click={editPainting}>Edit painting</button>
		<button type="button" on:click={savePainting}>Hang in museum!</button>
	{/if}

	<img src="/sprites/floor.png" alt="museum floor" class="-mt-40 -z-10" />
</div>

<style>
	.full-painting {
		width: calc(var(--width) * 0.5px);
		height: calc(var(--height) * 0.5px);
	}

	.swatch {
		@apply w-8 h-8;
		background-color: var(--color);
	}

	.swatch.current {
		@apply outline outline-red-600;
	}
</style>
