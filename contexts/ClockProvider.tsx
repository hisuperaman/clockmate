import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { TIME } from "@/constants/time";
import { Player } from "@/definitions";
import { GameState, GameStates } from "@/enums";
import * as Haptics from "expo-haptics";
import { ClockContext } from "./ClockContext";

const DEFAULT_TIME = TIME.FIVE_MINUTES;
const DEFAULT_INCREMENT = 0;

export const ClockProvider = ({ children }: PropsWithChildren) => {
	const [initialTime, setInitialTime] = useState<number>(DEFAULT_TIME);
	const [increment, setIncrement] = useState<number>(DEFAULT_INCREMENT);
	const [times, setTimes] = useState<[number, number]>([DEFAULT_TIME, DEFAULT_TIME]);
	const [activePlayer, setActivePlayer] = useState<Player>(0);
	const [gameState, setGameState] = useState<GameState>(GameStates.IDLE);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const activePlayerRef = useRef<Player>(activePlayer);
	const incrementRef = useRef<number>(increment);

	activePlayerRef.current = activePlayer;
	incrementRef.current = increment;

	const clearTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const startTimer = useCallback(() => {
		clearTimer();
		intervalRef.current = setInterval(() => {
			setTimes((prev) => {
				const ap = activePlayerRef.current;
				const next = Math.max(0, prev[ap] - 1);
				if (next === 0) {
					clearTimer();
					setGameState(GameStates.ENDED);
				}
				return ap === 0 ? [next, prev[1]] : [prev[0], next];
			});
		}, 1000);
	}, [clearTimer]);

	const handlePlayerTap = useCallback(
		(player: Player) => {
			if (gameState === GameStates.ENDED || gameState === GameStates.PAUSED) return;

			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

			if (gameState === GameStates.IDLE) {
				setActivePlayer(player);
				activePlayerRef.current = player;
				setGameState(GameStates.RUNNING);
				startTimer();
				return;
			}

			if (gameState === GameStates.RUNNING && activePlayer === player) {
				const next: Player = player === 0 ? 1 : 0;
				const inc = incrementRef.current;
				if (inc > 0) {
					setTimes((prev) =>
						player === 0 ? [prev[0] + inc, prev[1]] : [prev[0], prev[1] + inc]
					);
				}
				setActivePlayer(next);
				activePlayerRef.current = next;
			}
		},
		[gameState, activePlayer, startTimer]
	);

	const handlePause = useCallback(() => {
		if (gameState === GameStates.RUNNING) {
			clearTimer();
			setGameState(GameStates.PAUSED);
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		} else if (gameState === GameStates.PAUSED) {
			setGameState(GameStates.RUNNING);
			startTimer();
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	}, [gameState, clearTimer, startTimer]);

	const handleReset = useCallback(() => {
		clearTimer();
		setTimes([initialTime, initialTime]);
		setActivePlayer(0);
		setGameState(GameStates.IDLE);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}, [clearTimer, initialTime]);

	const setTimeControl = useCallback(
		(seconds: number, inc: number) => {
			clearTimer();
			setInitialTime(seconds);
			setIncrement(inc);
			incrementRef.current = inc;
			setTimes([seconds, seconds]);
			setActivePlayer(0);
			setGameState(GameStates.IDLE);
		},
		[clearTimer]
	);

	useEffect(() => {
		return () => clearTimer();
	}, [clearTimer]);

	return (
		<ClockContext.Provider
			value={{
				times,
				activePlayer,
				gameState,
				initialTime,
				increment,
				setTimeControl,
				handlePlayerTap,
				handlePause,
				handleReset,
			}}
		>
			{children}
		</ClockContext.Provider>
	);
}