<div class="container w-screen h-screen bg-slate-600 text-white">
	<div class="text-container flex flex-col justify-center items-center gap-8 text-center pt-12">
		<h1 class="text-center text-4xl font-headings">Welcome to your new museum!</h1>
		<p class="intro-text">
			As a very well-traveled bug, you've long lamented the lack of beautiful art available to you and
			your fellow bugs.
		</p>
		<p class="intro-text">
			So you started a museum! You might notice it's looking pretty empty, but that's okay, it's your
			job to fill it with new art.
		</p>
		<p class="intro-text">
			Using your memory of the paintings you've seen on your travels (don't worry, you'll be able to
			see them on screen!), you will create faithful (albeit very tiny) reproductions to display on
			the walls.
		</p>
		<a href="/view">Go to my museum</a>
	</div>
</div>

<style>
	.text-container {
		@apply flex flex-col justify-center items-center gap-8 text-center pt-12;
	}

	.intro-text {
		@apply max-w-md h-auto;
	}
</style>
