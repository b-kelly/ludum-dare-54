<script lang="ts">
	import { paintings } from '$lib/data';
	import { gameState } from '$lib/gameState';
	import type { PageData } from './$types';

	export let data: PageData;

	$: playerPainting = $gameState.finishedPaintings[data.painting];
</script>

<a href="/view">return to museum</a>
<a href="/create/paint?painting={data.painting}">edit painting</a>

<img src={playerPainting.image} alt={data.painting} />
<span>{paintings[data.painting].name} - {playerPainting.score} points</span>
