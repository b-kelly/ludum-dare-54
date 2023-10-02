<script lang="ts">
	import { gameState } from '$lib/gameState';
	import type { PageData } from './$types';
	import ScoreView from '$lib/ScoreView.svelte';

	export let data: PageData;

	$: playerPainting = $gameState.finishedPaintings[data.painting];
</script>

<ScoreView {playerPainting} painting={data.painting} />
