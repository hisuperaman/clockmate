import { View, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, IconButton, Text } from "@/components";
import { useClock } from "@/hooks";
import { GameStates } from "@/enums";
import { Player } from "@/definitions";
import { formatTime, formatTimeControl } from "@/utils/time";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING } from "@/constants/theme";
import { Clock3, Pause, Play, RotateCcw } from "lucide-react-native";

export default function ClockScreen() {
	const {
		times,
		activePlayer,
		gameState,
		initialTime,
		increment,
		handlePlayerTap,
		handlePause,
		handleReset,
	} = useClock();
	const insets = useSafeAreaInsets();

	const isRunning = gameState === GameStates.RUNNING;
	const isPaused = gameState === GameStates.PAUSED;
	const isIdle = gameState === GameStates.IDLE;
	const isEnded = gameState === GameStates.ENDED;

	const losingPlayer: Player | null = isEnded
		? times[0] === 0
			? 0
			: 1
		: null;

	function renderPlayerHalf(player: Player, flipped: boolean) {
		const isActive = activePlayer === player && isRunning;
		const isLoser = losingPlayer === player;
		const isWinner = isEnded && !isLoser;
		const bg = isActive ? COLORS.white : COLORS.black;
		const textColor = isActive ? COLORS.onLight : COLORS.textPrimary;
		const secondaryColor = isActive ? COLORS.onLightSecondary : COLORS.textSecondary;

		return (
			<TouchableOpacity
				activeOpacity={1}
				style={[
					styles.half,
					{ backgroundColor: bg },
					flipped && { paddingTop: insets.top + SPACING.lg },
					!flipped && { paddingBottom: insets.bottom + SPACING.lg },
				]}
				onPress={() => handlePlayerTap(player)}
				disabled={isEnded || isPaused}
				accessibilityRole="button"
				accessibilityLabel={`Player ${player + 1} clock, ${formatTime(times[player])}`}
			>
				<View
					style={[
						styles.halfContent,
						flipped && { transform: [{ rotate: "180deg" }] },
					]}
				>
					<Text
						variant="timer"
						color={textColor}
						numberOfLines={1}
						adjustsFontSizeToFit
						style={!isActive && isRunning && styles.timerDimmed}
					>
						{formatTime(times[player])}
					</Text>

					{increment > 0 && (isIdle || isRunning || isPaused) && (
						<View
							style={[
								styles.incrementBadge,
								{ borderColor: isActive ? COLORS.borderOnLight : COLORS.borderOnDark },
								!isActive && isRunning && styles.timerDimmed,
							]}
						>
							<Text variant="caption" color={secondaryColor}>
								+{increment}s
							</Text>
						</View>
					)}

					{isIdle && (
						<Text variant="overline" color={COLORS.textSecondary} style={styles.statusLabel}>
							TAP TO START
						</Text>
					)}

					{isPaused && (
						<Text variant="overline" color={secondaryColor} style={styles.statusLabel}>
							PAUSED
						</Text>
					)}

					{isEnded && isLoser && (
						<Text variant="overline" color={COLORS.textMuted} style={styles.statusLabel}>
							TIME OUT
						</Text>
					)}

					{isEnded && isWinner && (
						<Text variant="overline" color={COLORS.textPrimary} style={styles.statusLabel}>
							WINNER
						</Text>
					)}
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar hidden />

			{renderPlayerHalf(1, true)}

			<View style={styles.centerStrip}>
				<View style={styles.centerSide}>
					{(isIdle || isEnded) && (
						<Button
							icon={Clock3}
							label={formatTimeControl(initialTime, increment)}
							accessibilityLabel="Change time control"
							onPress={() => router.push("/setup")}
						/>
					)}
				</View>

				<View style={[styles.centerSide, styles.centerRight]}>
					{!isIdle && !isEnded && (
						<Button
							icon={isPaused ? Play : Pause}
							label={isPaused ? "Resume" : "Pause"}
							onPress={handlePause}
						/>
					)}

					{(isEnded || isPaused || isIdle) && (
						<IconButton
							icon={RotateCcw}
							accessibilityLabel="Reset clock"
							onPress={handleReset}
						/>
					)}
				</View>
			</View>

			{renderPlayerHalf(0, false)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	half: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: SPACING.lg,
	},
	halfContent: {
		alignItems: "center",
		gap: SPACING.md,
	},
	timerDimmed: {
		opacity: 0.4,
	},
	incrementBadge: {
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
		borderRadius: RADII.pill,
		borderWidth: SIZES.borderWidth,
	},
	statusLabel: {
		marginTop: SPACING.xs,
	},
	centerStrip: {
		height: SIZES.touch + SPACING.lg * 2,
		backgroundColor: COLORS.background,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: SPACING.lg,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLORS.borderSubtle,
	},
	centerSide: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.sm,
	},
	centerRight: {
		justifyContent: "flex-end",
	},
});
