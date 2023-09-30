<script lang="ts">
	import { dev } from '$app/environment';

	export let disabled = false;
</script>

{#if dev && !disabled}
	<div class="mt-16 p-4 border rounded">
		<div>DEBUG</div>
		<slot />
	</div>
{/if}
