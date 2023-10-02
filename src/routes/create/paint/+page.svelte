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
	import { scoreImage, getCriticReview } from '$lib/image';
	import ScoreView from '$lib/ScoreView.svelte';

	export let data: PageData;

	let finishedPainting: string = '';
	let finalScore: { match: number; total: number; score: number } | undefined;

	let step: 'create' | 'scoring' = 'create';
	let currentPainting: Painting = paintings[data.painting];

	let canvas: Canvas;

	const MULT = 16;

	const brushSizes = [1, 2, 4];
	let currentBrush = brushSizes[0];

	let currentColor = currentPainting.palette[0];
	let isDrawerOpen = false;

	let debug_showTargetOverlay = false;
	let debug_showPaintingOverlay = false;

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
			`/paintings/${currentPainting.id}_target.png`,
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

	function eraseCanvas() {
		//TODO: implement canvas clear
	}
</script>

{#if step === 'create'}
	<div class="bg-museum-paint bg-cover bg-no-repeat flex flex-row select-none">
		<div class="p-6 flex flex-col h-screen justify-between">
			<Grid dimensions={currentPainting} multiplier={MULT} disabled>
				<img
					class="half-painting min-w-max"
					src="/paintings/{currentPainting.id}_full.jpg"
					alt={currentPainting.name}
					style:--height={cHeight}
					style:--width={cWidth}
				/>
			</Grid>
			<img src="/sprites/bug.png" class="min-w-max hidden md:block" alt="bug artiste" />
		</div>

		<div class="easel">
			<Grid
				dimensions={currentPainting}
				multiplier={MULT}
				class="border border-gray-500 bg-canvas-bg"
			>
				<Canvas
					bind:this={canvas}
					initialImage={finishedPainting}
					dimensions={currentPainting}
					multiplier={MULT}
					{currentColor}
					brushSize={currentBrush}
				/>
				<img
					class="full-painting absolute top-0 left-0 pointer-events-none opacity-40"
					class:hidden={!debug_showPaintingOverlay}
					src="/paintings/{currentPainting.id}_full.jpg"
					alt={currentPainting.name}
					style:--height={cHeight}
					style:--width={cWidth}
				/>
			</Grid>

			<div class="p-2 bg-easel-fore border-b-4 border-b-easel-back">
				<div class="flex gap-1">
					{#each currentPainting.palette as color}
						<div>
							<input
								id="radio-{color}"
								class="sr-only"
								type="radio"
								value={color}
								bind:group={currentColor}
							/>
							<label for="radio-{color}" class="swatch" style:--color={color}>
								<span class="sr-only">{color}</span>
							</label>
						</div>
					{/each}
					<div>
						<input
							id="radio-transparent"
							class="sr-only"
							type="radio"
							value="transparent"
							bind:group={currentColor}
						/>
						<label for="radio-transparent" class="swatch" style:--color="white">
							<span class="sr-only">transparent</span>
						</label>
					</div>
					<button
						class="leading-none h-8 p-2 w-8 bg-slate-500"
						on:click={() => (isDrawerOpen = !isDrawerOpen)}
					>
						{#if isDrawerOpen}
							<span>^</span>
						{:else}
							<span>v</span>
						{/if}
					</button>
				</div>
				{#if isDrawerOpen}
					<div class="mt-2 text-sm flex gap-2 justify-evenly content-center">
						<button class="bg-red-500" on:click={() => eraseCanvas}>Clear all tiles</button>
						<div>Brush size:</div>
						{#each brushSizes as brush}
							<div>
								<input
									id="radio-brush-{brush}"
									type="radio"
									value={brush}
									bind:group={currentBrush}
								/>
								<label for="radio-brush-{brush}">
									{brush}px
								</label>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<button type="button" class="bg-slate-700 text-white" on:click={startScoring}>Submit</button>
		</div>

		<DebugOnly disabled>
			<div>
				<Grid dimensions={currentPainting} multiplier={MULT}>
					<img
						class="full-painting pixelated"
						src="/paintings/{currentPainting.id}_target.png"
						alt={currentPainting.name}
						style:--height={cHeight}
						style:--width={cWidth}
					/>
					<img
						class="full-painting absolute top-0 left-0 opacity-40"
						class:hidden={!debug_showTargetOverlay}
						src="/paintings/{currentPainting.id}_full.jpg"
						alt={currentPainting.name}
						style:--height={cHeight}
						style:--width={cWidth}
					/>
				</Grid>
				<label>
					<input type="checkbox" bind:checked={debug_showTargetOverlay} /> Show target overlay
				</label>
				<label>
					<input type="checkbox" bind:checked={debug_showPaintingOverlay} /> Show painting overlay
				</label>
			</div>
		</DebugOnly>
	</div>
{:else if step === 'scoring'}
	<ScoreView
		playerPainting={{ image: finishedPainting, score: finalScore?.score || 0 }}
		painting={currentPainting.id}
	/>
{/if}

<style>
	.easel {
		@apply bg-no-repeat bg-bottom
			flex flex-col gap-2 items-center justify-end pb-16;
		background-image: url('/sprites/easel.png');
	}

	.full-painting {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}

	.half-painting {
		width: calc(var(--width) * 0.5px);
		height: calc(var(--height) * 0.5px);
	}

	.swatch {
		@apply w-8 h-8 inline-block cursor-pointer rounded-full;
		background-color: var(--color);
	}

	input:checked + .swatch {
		@apply outline outline-red-600;
	}

	input:focus-visible + .swatch {
		@apply outline;
	}
</style>
