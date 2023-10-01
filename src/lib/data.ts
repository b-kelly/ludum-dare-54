export interface Wing {
	name: string;
	unlockReq: number;
	paintings: string[];
}

export interface Painting {
	id: string;
	name: string;
	artist: string;
	bugName: string;
	width: number;
	height: number;
	palette: string[];
}

export const wings: Wing[] = [
	{
		name: 'Renaissance Wing',
		unlockReq: 0,
		paintings: ['mona-lisa', 'portrait-man', 'margaret-austria']
	},
	{
		name: '(Post) Impressionist Wing',
		unlockReq: 100,
		paintings: ['straw-hat', 'young-woman-ibis', 'sunday-grande-jatte']
	},
	{
		name: 'Japanese Wing',
		unlockReq: 200,
		paintings: ['crow-and-willow', 'under-the-wave']
	},
	{
		name: '1900s-1940s Wing',
		unlockReq: 300,
		paintings: ['mada-primavesi', 'two-women', 'parliament-sunset']
	}
];

//all from the met except:
//Hokusai + Seurat -> art institute of chicago
//Monet -> NGA
export const paintings: Record<string, Painting> = {
	'mona-lisa': {
		id: 'mona-lisa',
		name: 'Mona Lisa',
		artist: 'Leonardo Da Vinci',
		bugName: 'Bugga Lisa',
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
	},
	'straw-hat': {
		id: 'straw-hat',
		name: 'Self Portrait with a Straw Hat',
		artist: 'Vincent Van Gogh',
		bugName: 'Man Portrait with a Yummy Hat',
		height: 20,
		width: 16,
		palette: ['#a1b2c3']
	},
	'young-woman-bird': {
		id: 'young-woman-bird',
		name: 'Young Woman with Ibis',
		artist: 'Edgar Degas',
		bugName: 'Young Woman with AHH! BIRD!',
		height: 22,
		width: 16,
		palette: ['#a1b2c3']
	},
	'portrait-man': {
		id: 'portrait-man',
		name: 'Portrait of a Man',
		artist: 'Domenico Ghirlandaio',
		bugName: 'Portrait of a ladybug',
		height: 23,
		width: 18,
		palette: ['#a1b2c3']
	},
	'crow-and-willow': {
		id: 'crow-and-willow',
		name: 'Crow and Willow Tree',
		artist: 'Kawanabe Kyōsai',
		bugName: 'AHH! BIRD! and Willow Tree',
		height: 22,
		width: 16,
		palette: ['#a1b2c3']
	},
	'under-the-wave': {
		id: 'under-the-wave',
		name: 'Under the Wave off Kanagawa',
		artist: 'Katsushika Hokusai',
		bugName: 'I Am Not a Water Bug',
		height: 17,
		width: 24,
		palette: ['#a1b2c3']
	},
	'sunday-grande-jatte': {
		id: 'sunday-grande-jatte',
		name: 'A Sunday on La Grande Jatte',
		artist: 'Georges Seurat',
		bugName: 'A Sunday with La Grass Hopper',
		height: 16,
		width: 24,
		palette: ['#a1b2c3']
	},
	'mada-primavesi': {
		id: 'mada-primavesi',
		name: 'Mäda Primavesi',
		artist: 'Gustav Klimt',
		bugName: 'Springtime Flower Girl',
		height: 23,
		width: 18,
		palette: ['#a1b2c3']
	},
	'two-women': {
		id: 'two-women',
		name: 'Two Women',
		artist: 'Paul Gauguin',
		bugName: 'Two Women and some Tasty Fruit',
		height: 16,
		width: 20,
		palette: ['#a1b2c3']
	},
	'parliament-sunset': {
		id: 'parliament-sunset',
		name: 'The Houses of Parliament, Sunset',
		artist: 'Claude Monet',
		bugName: 'This is so hard',
		height: 20,
		width: 23,
		palette: ['#a1b2c3']
	},
	'margaret-austria': {
		id: 'margaret-austria',
		name: 'Margaret of Austria',
		artist: 'Jean Hey',
		bugName: 'Margaret Far Away',
		height: 24,
		width: 27,
		palette: ['#a1b2c3']
	}
};
