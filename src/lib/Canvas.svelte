<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImageAsync } from './image';

	export let dimensions: { height: number; width: number };
	export let currentColor: string | undefined;
	export let multiplier: number;
	export let initialImage: string = '';
	export let brushSize = 1;

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

		function dragAndDraw(e: MouseEvent) {
			fillColor(ctx, e.offsetX, e.offsetY);
		}

		function stopDrawing() {
			canvas.removeEventListener('mousemove', dragAndDraw);
			window.removeEventListener('mouseup', stopDrawing);
		}

		// drag-and-draw painting
		canvas.addEventListener('mousedown', function (e) {
			fillColor(ctx, e.offsetX, e.offsetY);
			canvas.addEventListener('mousemove', dragAndDraw);
			window.addEventListener('mouseup', stopDrawing);
		});

		// if we're editing an image, pre-draw it
		if (initialImage) {
			void loadImageAsync(initialImage, cWidth, cHeight, canvas);
		}
	}

	onMount(() => {
		redraw();
	});

	function fillColor(ctx: CanvasRenderingContext2D | null, x: number, y: number) {
		if (!ctx) {
			return;
		}

		ctx.fillStyle = currentColor ?? 'transparent';

		const clampX = Math.floor(x / multiplier) * multiplier;
		const clampY = Math.floor(y / multiplier) * multiplier;

		const brushWidth = multiplier * brushSize;

		ctx.clearRect(clampX, clampY, brushWidth, brushWidth);

		if (ctx.fillStyle !== 'transparent') {
			ctx.fillRect(clampX, clampY, brushWidth, brushWidth);
		}
	}
</script>

<canvas bind:this={canvas} style:--height={cHeight} style:--width={cWidth} class="paint-canvas" />

<style>
	.paint-canvas {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
	}
</style>
