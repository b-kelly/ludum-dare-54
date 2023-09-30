export interface Wing {
	name: string;
	unlockReq: number;
	paintings: string[];
}

export interface Painting {
	id: string;
	name: string;
	width: number;
	height: number;
	palette: string[];
}

export const wings: Wing[] = [
	{
		name: 'Wing 1',
		unlockReq: 0,
		paintings: ['mona-lisa']
	},
	{
		name: 'Wing 2',
		unlockReq: 100,
		paintings: []
	}
];

export const paintings: Record<string, Painting> = {
	'mona-lisa': {
		id: 'mona-lisa',
		name: 'Mona Lisa',
		height: 24,
		width: 16,
		palette: [
			'#606948',
			'#798453',
			'#96955e',
			'#604f33',
			'#916a35',
			'#4f322a',
			'#231524',
			'#cea552'
		]
	}
};
