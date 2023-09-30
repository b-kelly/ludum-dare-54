<script lang="ts">
	import type { Painting } from '$lib/data';
	import { onMount } from 'svelte';

	export let dimensions: { height: number; width: number };
	export let currentColor: string | undefined;
	export let multiplier: number;

	let canvas: HTMLCanvasElement;
	$: cHeight = dimensions.height * multiplier;
	$: cWidth = dimensions.width * multiplier;

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
	});

	function fillColor(ctx: CanvasRenderingContext2D, x: number, y: number) {
		ctx.fillStyle = currentColor ?? 'transparent';

		const clampX = Math.floor(x / multiplier) * multiplier;
		const clampY = Math.floor(y / multiplier) * multiplier;

		ctx.fillRect(clampX, clampY, multiplier, multiplier);
	}
</script>

<canvas bind:this={canvas} style:--height={cHeight} style:--width={cWidth} class="paint-canvas" />

<style>
	.paint-canvas {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}
</style>
