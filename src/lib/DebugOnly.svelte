<script lang="ts">
	import { dev } from '$app/environment';
</script>

{#if dev}
	<div class="debug-container">
		<div>DEBUG</div>
		<slot />
	</div>
{/if}

<style>
	.debug-container {
		margin-top: 64px;
	}
</style>
