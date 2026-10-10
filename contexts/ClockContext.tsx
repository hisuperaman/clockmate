import { Player } from "@/definitions";
import { GameState } from "@/enums";
import { createContext } from "react";

export interface ClockContextType {
	times: [number, number];
	activePlayer: Player;
	gameState: GameState;
	initialTime: number;
	increment: number;
	setTimeControl: (seconds: number, increment: number) => void;
	handlePlayerTap: (player: Player) => void;
	handlePause: () => void;
	handleReset: () => void;
}

export const ClockContext = createContext<ClockContextType | undefined>(undefined);