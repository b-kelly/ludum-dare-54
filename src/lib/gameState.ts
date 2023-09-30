import { derived, writable, type Writable } from 'svelte/store';

export interface GameState {
	userId: string;
	finishedPaintings: Record<string, { image: string; score: number }>;
}

// TODO persist to disk to keep state between hard page reloads
function gameStateStore(): Writable<GameState> {
	return writable({
		userId: 'todo_userid',
		finishedPaintings: {}
	});
}

export const gameState = gameStateStore();
export const gameScore = derived(gameState, (gs) =>
	Object.values(gs.finishedPaintings).reduce((p, n) => p + n.score, 0)
);
