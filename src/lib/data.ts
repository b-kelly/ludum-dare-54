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

export interface Review {
	scoreMax: number;
	content: string;
	critic: number;
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
		paintings: ['straw-hat', 'young-woman-bird', 'sunday-grande-jatte']
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
			'#798555',
			'#96965e',
			'#604f31',
			'#d1a952',
			'#231625',
			'#c3bc81',
			'#584e39',
			'#c3bc81'
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
		palette: ['#a76c49', '#a04129', '#232822', '#514537', '#2f524d', '#778069']
	},
	'portrait-man': {
		id: 'portrait-man',
		name: 'Portrait of a Man',
		artist: 'Domenico Ghirlandaio',
		bugName: 'Portrait of a ladybug',
		height: 20,
		width: 16,
		palette: ['#35501a', '#515424', '#372922', '#b4885f', '#9f6a40', '#632121', '#a7241b']
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
		height: 23,
		width: 16,
		palette: ['#748571', '#91603a', '#2a0f08', '#617e85', '#738d8e', '#9d8e59', '#c5bbad']
	}
};

export const reviews: Review[] = [
	{
		scoreMax: 19,
		content: "I'm not sure where the bug museum is getting its funding, but they're surely not using it.",
		critic: 1
	},
	{
		scoreMax: 39,
		content: "I've seen better reproductions - much better... but then again, I've also seen worse...",
		critic: 2
	},
	{
		scoreMax: 59,
		content: "Truly reminiscent of Picasso's baby period. When he was a baby. Needs work.",
		critic: 3
	},
	{
		scoreMax: 79,
		content: "Really solid reproduction - bugs will flock from all over (the backyard) to see this work!",
		critic: 4
	},
	{
		scoreMax: 89,
		content: "This museum has really outdone itself, producing a work of absolute grandeur and majesty. But, tiny.",
		critic: 5
	},
	{
		scoreMax: 100,
		content: "I've never seen work as beautiful as this. Dare I say... better than the original?!",
		critic: 6
	}
]