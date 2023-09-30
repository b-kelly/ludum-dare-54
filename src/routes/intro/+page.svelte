<script lang="ts">
	import { gameState } from '$lib/gameState';
	import { onMount } from 'svelte';

	onMount(() => {
		// set the userid to a new value
		gameState.update((gs) => {
			gs.userId = 'todo_userid_new';
			return gs;
		});
	});
</script>

<h1>Welcome to your museum!</h1>
<p>
	You might notice it's looking pretty empty, but that's okay, it's your job to fill it with new art
</p>

<a href="/view">Go to my museum</a>
