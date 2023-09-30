/** @type {import('./$types').PageLoad} */
export function load({ url }) {
	const params = url.searchParams;

	return {
		wing: params.get('wing') ?? 0
	};
}
