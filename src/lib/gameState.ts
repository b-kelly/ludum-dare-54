import { writable, type Writable } from 'svelte/store';

export interface GameState {
	userId: string;
	finishedPaintings: { id: string; image: string }[];
}

// TODO persist to disk to keep state between hard page reloads
function gameStateStore(): Writable<GameState> {
	return writable({
		userId: 'todo_userid',
		finishedPaintings: []
	});
}

export const gameState = gameStateStore();
