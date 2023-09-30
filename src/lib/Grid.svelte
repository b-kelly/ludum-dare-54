<script lang="ts">
	import { onMount } from 'svelte';

	export let dimensions: { height: number; width: number };
	export let multiplier: number;
	export let disabled = false;
	let className: string = '';
	export { className as class };

	let devicePixelRatio: number;

	let canvas: HTMLCanvasElement;
	$: cHeight = dimensions.height * multiplier;
	$: cWidth = dimensions.width * multiplier;

	onMount(() => {
		if (disabled) {
			return;
		}

		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw 'TODO No grid context';
		}

		// ensure crisp lines for hidpi screens with partial scaling
		canvas.height = cHeight * devicePixelRatio;
		canvas.width = cWidth * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);

		drawGrid(ctx, dimensions.height, dimensions.width);
	});

	function drawGrid(ctx: CanvasRenderingContext2D, height: number, width: number) {
		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.lineWidth = 1;

		// draw horizontal lines
		for (let i = 1; i < height; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * multiplier);
			ctx.lineTo(cWidth, i * multiplier);
			ctx.stroke();
		}

		//draw vertical lines
		for (let i = 1; i < width; i++) {
			ctx.beginPath();
			ctx.moveTo(i * multiplier, 0);
			ctx.lineTo(i * multiplier, cHeight);
			ctx.stroke();
		}
	}
</script>

<svelte:window bind:devicePixelRatio />

<div class="relative {className}">
	{#if !disabled}
		<canvas
			bind:this={canvas}
			style:--height={cHeight}
			style:--width={cWidth}
			class="paint-canvas"
		/>
	{/if}
	<slot />
</div>

<style>
	.paint-canvas {
		@apply pointer-events-none absolute top-0 left-0;
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}
</style>
