/** @type {import('./$types').PageLoad} */
export function load({ url }) {
	const params = url.searchParams;

	return {
		painting: params.get('painting') ?? ''
	};
}
