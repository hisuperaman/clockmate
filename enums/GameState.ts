export const GameStates = {
	IDLE: "idle",
	RUNNING: "running",
	PAUSED: "paused",
	ENDED: "ended"
}

export type GameState = (typeof GameStates)[keyof typeof GameStates];