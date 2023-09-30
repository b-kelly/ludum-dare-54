<script lang="ts">
	import type { Painting } from '$lib';
	import { onMount } from 'svelte';

	export let painting: Painting;
	export let currentColor: string | undefined;

	const MULT = 10;

	let canvas: HTMLCanvasElement;
	$: cHeight = painting.height * MULT;
	$: cWidth = painting.width * MULT;

	onMount(() => {
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw 'TODO';
		}

		// ensure crisp lines for hidpi screens with partial scaling
		canvas.height = cHeight * devicePixelRatio;
		canvas.width = cWidth * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);

		canvas.addEventListener('click', (e) => fillColor(ctx, e.offsetX, e.offsetY));

		drawGrid(ctx, painting);
	});

	function drawGrid(ctx: CanvasRenderingContext2D, painting: Painting) {
		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.lineWidth = 1;

		// draw horizontal lines
		for (let i = 1; i < painting.height; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * MULT);
			ctx.lineTo(cWidth, i * MULT);
			ctx.stroke();
		}

		//draw vertical lines
		for (let i = 1; i < painting.width; i++) {
			ctx.beginPath();
			ctx.moveTo(i * MULT, 0);
			ctx.lineTo(i * MULT, cHeight);
			ctx.stroke();
		}
	}

	function fillColor(ctx: CanvasRenderingContext2D, x: number, y: number) {
		ctx.fillStyle = currentColor ?? 'transparent';

		const clampX = Math.floor(x / MULT) * MULT;
		const clampY = Math.floor(y / MULT) * MULT;

		ctx.fillRect(clampX, clampY, MULT, MULT);
	}
</script>

<div>
	<canvas bind:this={canvas} style:--height={cHeight} style:--width={cWidth} class="paint-canvas" />
</div>

<style>
	.paint-canvas {
		border: 1px solid black;
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}
</style>
