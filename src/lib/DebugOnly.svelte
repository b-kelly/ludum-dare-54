<script lang="ts">
	import { dev } from '$app/environment';
</script>

{#if dev}
	<div class="mt-16 p-4 border rounded">
		<div>DEBUG</div>
		<slot />
	</div>
{/if}
