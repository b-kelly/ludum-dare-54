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
			'#261B29',
			'#61674A',
			'#564031',
			'#798556',
			'#926835',
			'#96965F',
			'#EFD482',
			'#D3AB57'
		]
	}
};
