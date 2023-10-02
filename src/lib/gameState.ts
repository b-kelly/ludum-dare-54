import { browser } from '$app/environment';
import { derived, get, writable, type Writable } from 'svelte/store';

export interface FinishedPainting {
	image: string;
	score: number;
}

export interface GameState {
	userId: string;
	finishedPaintings: Record<string, FinishedPainting>;
}

function localStorageStore<T>(key: string, initial: T): Writable<T> {
	if (!browser) {
		return writable<T>(initial);
	}

	const existing = localStorage.getItem(key);
	const store = writable<T>(existing ? JSON.parse(existing) : initial);
	const localSet = (v: T) => {
		localStorage.setItem(key, JSON.stringify(v));
		store.set(v);
	};

	return {
		subscribe: store.subscribe,
		set: localSet,
		update: (cb) => {
			const updated = cb(get(store));
			localSet(updated);
		}
	};
}

export const gameState = localStorageStore<GameState>('gamestate', {
	userId: 'todo_userid',
	finishedPaintings: {}
});

export const gameScore = derived(gameState, (gs) =>
	Object.values(gs.finishedPaintings).reduce((p, n) => p + n.score, 0)
);
