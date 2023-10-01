<div class="bg-slate-900 w-screen h-screen text-white flex flex-col justify-center bg-bug bg-no-repeat bg-left-bottom">
	<h1 class="bm-page-title self-center mb-4 max-w-sm text-center">If you've already started a museum, enter your code here:</h1>
	<div class="self-center">
		<form on:submit|preventDefault={() => alert('TODO Not implemented')} class="self-center mb-48">
			<input type="text" />
			<button type="submit" class="text-white bg-slate-600">Enter museum</button>
		</form>
		<div class="text-center text-2xl"> or <a href="/intro">open new museum</a></div>
	</div>
</div>
