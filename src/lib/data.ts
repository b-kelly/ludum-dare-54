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
		paintings: ['mona-lisa', 'portrait-man', 'margaret-austria', 'rest-on-flight']
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
	'rest-on-flight': {
		id: 'rest-on-flight',
		name: 'The Rest on the Flight into Egypt',
		artist: 'Gerard David',
		bugName: 'The Rest on the Flight Without Wings',
		height: 21,
		width: 16,
		palette: [
			'#bbc0bb',
			'#6791a8',
			'#4b433d',
			'#7a846f',
			'#af9362',
			'#4b433d',
			'#6791a8',
			'#3f6296',
			'#917a86'
		]
	},
	'straw-hat': {
		id: 'straw-hat',
		name: 'Self Portrait with a Straw Hat',
		artist: 'Vincent Van Gogh',
		bugName: 'Man Portrait with a Yummy Hat',
		height: 20,
		width: 16,
		palette: ['#ba9960', '#977454', '#b2a28c', '#706659', '#827c82', '#7c8371', '#747784']
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
		bugName: 'Portrait by a Mantis',
		height: 20,
		width: 16,
		palette: ['#35501a', '#515424', '#372922', '#b4885f', '#9f6a40', '#632121', '#a7241b']
	},
	'crow-and-willow': {
		id: 'crow-and-willow',
		name: 'Crow and Willow Tree',
		artist: 'Kawanabe Kyōsai',
		bugName: 'Cowering in Willow Tree',
		height: 22,
		width: 16,
		palette: ['#89786d', '#98897a', '#a99989', '#4d443c', '#c2af92', '#2e2824']
	},
	'under-the-wave': {
		id: 'under-the-wave',
		name: 'Under the Wave off Kanagawa',
		artist: 'Katsushika Hokusai',
		bugName: 'I Am Not a Watabuga',
		height: 16,
		width: 23,
		palette: ['#c2b9a4', '#ddccae', '#908879', '#304359', '#768990']
	},
	'sunday-grande-jatte': {
		id: 'sunday-grande-jatte',
		name: 'A Sunday on La Grande Jatte',
		artist: 'Georges Seurat',
		bugName: 'A Sunday with La Grass Hopper',
		height: 16,
		width: 24,
		palette: ['#798890', '#9b9b98', '#7a826e', '#5a605b', '#8b7368', '#727884', '#989269']
	},
	'mada-primavesi': {
		id: 'mada-primavesi',
		name: 'Mäda Primavesi',
		artist: 'Gustav Klimt',
		bugName: 'Major Pollen Vestige',
		height: 22,
		width: 16,
		palette: [
			'#b7aaac',
			'#9d779e',
			'#5e5e5c',
			'#666d92',
			'#6c9792',
			'#6c9792',
			'#4e8b78',
			'#5e5e5c'
		]
	},
	'two-women': {
		id: 'two-women',
		name: 'Two Women',
		artist: 'Paul Gauguin',
		bugName: 'Two Women and some Tasty Fruit',
		height: 16,
		width: 20,
		palette: ['#9fa2a3', '#667691', '#1b2620', '#514c1d', '#7a8838', '#ac5e15']
	},
	'parliament-sunset': {
		id: 'parliament-sunset',
		name: 'The Houses of Parliament, Sunset',
		artist: 'Claude Monet',
		bugName: 'The Houses of Parsley and Mint, Sunset',
		height: 20,
		width: 23,
		palette: [
			'#b4aa9e',
			'#547891',
			'#658b9e',
			'#b99a78',
			'#977d8a',
			'#5c6f78',
			'#658b9e',
			'#68877c'
		]
	},
	'margaret-austria': {
		id: 'margaret-austria',
		name: 'Margaret of Austria',
		artist: 'Jean Hey',
		bugName: 'Marmalade Far Away',
		height: 23,
		width: 16,
		palette: ['#748571', '#91603a', '#2a0f08', '#617e85', '#738d8e', '#9d8e59', '#c5bbad']
	}
};

export const reviews: Review[] = [
	{
		scoreMax: 19,
		content:
			"I'm not sure where the bug museum is getting its funding, but they're surely not using it.",
		critic: 1
	},
	{
		scoreMax: 39,
		content:
			"I've seen better reproductions - much better... but then again, I've also seen worse...",
		critic: 2
	},
	{
		scoreMax: 59,
		content: "Truly reminiscent of Picasso's baby period. When he was a baby. Needs work.",
		critic: 3
	},
	{
		scoreMax: 79,
		content:
			'Really solid reproduction - bugs will flock from all over (the backyard) to see this work!',
		critic: 4
	},
	{
		scoreMax: 89,
		content:
			'This museum has really outdone itself, producing a work of absolute grandeur and majesty. But, tiny.',
		critic: 5
	},
	{
		scoreMax: 100,
		content: "I've never seen work as beautiful as this. Dare I say... better than the original?!",
		critic: 6
	}
];
