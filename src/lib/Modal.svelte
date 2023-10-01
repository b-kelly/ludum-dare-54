<script lang="ts">
	export let open = false;
</script>

<aside class="modal relative p-lg z-20" class:visible={open}>
	<div class="modal-dialog">
		<header class="modal-title">
			<span>
				<slot name="title" />
			</span>
			<button type="button" class="text-current" on:click={() => (open = false)}>
				<span>X</span>
			</button>
		</header>
		<section class="modal-body">
			<slot name="body" />
		</section>
	</div>
</aside>

<style>
	.modal {
		@apply w-full h-full fixed top-0 left-0 hidden
            items-center justify-center;
	}

	.modal-dialog {
		@apply bg-slate-300 rounded-sm max-w-full w-full mx-36 p-4 gap-4 flex flex-col;
	}

	.modal-title {
		@apply text-2xl flex items-start justify-between;
	}

	.modal.visible {
		@apply flex;
	}
</style>
