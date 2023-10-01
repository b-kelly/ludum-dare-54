<script lang="ts">
	import { dev } from '$app/environment';

	export let disabled = false;
</script>

{#if dev && !disabled}
	<slot />
{/if}
