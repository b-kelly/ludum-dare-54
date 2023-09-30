<script lang="ts">
	import { onMount } from 'svelte';

	export let dimensions: { height: number; width: number };
	export let currentColor: string | undefined;
	export let multiplier: number;
	export let initialImage: string = '';

	let canvas: HTMLCanvasElement;
	$: cHeight = dimensions.height * multiplier;
	$: cWidth = dimensions.width * multiplier;

	export function getImage() {
		return canvas.toDataURL();
	}

	export function redraw() {
		const ctx = canvas?.getContext('2d');

		if (!ctx) {
			throw 'TODO No canvas context';
		}

		// ensure crisp lines for hidpi screens with partial scaling
		canvas.height = cHeight * devicePixelRatio;
		canvas.width = cWidth * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);

		canvas.addEventListener('click', (e) => fillColor(ctx, e.offsetX, e.offsetY));

		// if we're editing an image, pre-draw it
		if (initialImage) {
			const img = new Image();
			img.onload = () => {
				ctx.drawImage(img, 0, 0, cWidth, cHeight);
			};
			img.src = initialImage;
		}
	}

	onMount(() => {
		redraw();
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
