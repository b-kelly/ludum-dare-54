export function loadImageAsync(
	src: string,
	width: number,
	height: number,
	canvas: HTMLCanvasElement | null = null
): Promise<HTMLCanvasElement> {
	if (!canvas) {
		canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
	}

	const ctx = canvas?.getContext('2d');

	if (!ctx) {
		throw 'TODO No canvas context';
	}

	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			ctx.drawImage(img, 0, 0, width, height);
			resolve(canvas!);
		};
		img.src = src;
	});
}

export function getPixels(canvas: HTMLCanvasElement, scaleX = 1, scaleY = 1): string[] {
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw 'TODO No canvas context';
	}

	const { width, height } = canvas;

	const pixelData = ctx.getImageData(0, 0, width, height).data;
	// TODO will be more memory efficient to use numbers, but I'm being lazy
	const pixels: string[] = [];

	// the array is in RGBA format, so there's 4 entries per pixel
	for (let i = 0; i < pixelData.length; i += 4) {
		const parts = {
			r: pixelData[i],
			g: pixelData[i + 1],
			b: pixelData[i + 2]
			// we're skipping the `a` value since it'll always be 255
		};

		pixels.push(`${parts.r.toString(16)}${parts.g.toString(16)}${parts.b.toString(16)}`);
	}

	// if there's no scaling, then just return the raw data
	if (scaleX === 1 && scaleY === 1) {
		return pixels;
	}

	// check that we're not doing fractional scaling
	const skipX = width / scaleX;
	const skipY = height / scaleY;

	if (skipX % 1 > 0 || skipY % 1 > 0 || skipX !== skipY) {
		throw 'Cannot do fractional or subpixel scaling';
	}

	const trimmed: string[] = [];

	// grab only the number of pixels we're scaling to
	for (let i = 0; i < scaleX * scaleY; i++) {
		const row = i % scaleX;
		const col = Math.floor(i / scaleX);
		// const pixel = pixels[row + scaleX * col];

		const x = row * skipX;
		const y = col * skipY;
		const pixel = pixels[x + scaleX * y];

		trimmed.push(pixel);
	}

	// TODO scaling
	return trimmed;
}

export async function scoreImage(
	src: string,
	target: string,
	width: number,
	height: number
): Promise<{
	match: number;
	total: number;
	score: number;
}> {
	const srcImg = await loadImageAsync(src, width, height);
	const targetImg = await loadImageAsync(target, width, height);

	const srcPixels = getPixels(srcImg);
	const targetPixels = getPixels(targetImg);

	if (srcPixels.length !== targetPixels.length) {
		// in theory, this should never happen but... I'm not writing unit tests so YOLO
		console.warn(
			`Inaccurate image scoring, mismatch pixel data: src ${srcPixels.length}; target ${targetPixels.length}`
		);
	}

	let correctPixels = 0;

	for (let i = 0; i < targetPixels.length; i++) {
		const compare = srcPixels[i];
		if (targetPixels[i] === compare) {
			correctPixels += 1;
		}
	}

	// return the score as the correct percentage
	return {
		match: correctPixels,
		total: targetPixels.length,
		score: Math.floor((correctPixels / targetPixels.length) * 100)
	};
}
