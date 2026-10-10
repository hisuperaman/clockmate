import {
	View,
	StatusBar,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Chip, IconButton, NumberField, Text, TimeControlButton } from "@/components";
import { TimeControl } from "@/definitions";
import { Categories } from "@/enums";
import { useClock } from "@/hooks";
import { CATEGORIES } from "@/constants/categories";
import { COLORS } from "@/constants/colors";
import { SIZES, SPACING } from "@/constants/theme";
import { X } from "lucide-react-native";

const TIME_CONTROLS: TimeControl[] = [
	// Bullet
	{ label: "1+0", category: Categories.BULLET, seconds: 60, increment: 0 },
	{ label: "1+1", category: Categories.BULLET, seconds: 60, increment: 1 },
	{ label: "2+1", category: Categories.BULLET, seconds: 120, increment: 1 },
	// Blitz
	{ label: "3+0", category: Categories.BLITZ, seconds: 180, increment: 0 },
	{ label: "3+2", category: Categories.BLITZ, seconds: 180, increment: 2 },
	{ label: "5+0", category: Categories.BLITZ, seconds: 300, increment: 0 },
	{ label: "5+3", category: Categories.BLITZ, seconds: 300, increment: 3 },
	// Rapid
	{ label: "10+0", category: Categories.RAPID, seconds: 600, increment: 0 },
	{ label: "10+5", category: Categories.RAPID, seconds: 600, increment: 5 },
	{ label: "15+10", category: Categories.RAPID, seconds: 900, increment: 10 },
	{ label: "25+10", category: Categories.RAPID, seconds: 1500, increment: 10 },
	// Classical
	{ label: "30+0", category: Categories.CLASSICAL, seconds: 1800, increment: 0 },
	{ label: "30+20", category: Categories.CLASSICAL, seconds: 1800, increment: 20 },
	{ label: "60+0", category: Categories.CLASSICAL, seconds: 3600, increment: 0 },
	{ label: "90+30", category: Categories.CLASSICAL, seconds: 5400, increment: 30 },
];

export default function SetupScreen() {
	const insets = useSafeAreaInsets();
	const { initialTime, increment: ctxIncrement, setTimeControl } = useClock();

	const matchedPreset = TIME_CONTROLS.find(
		(tc) => tc.seconds === initialTime && tc.increment === ctxIncrement
	);

	const [selectedSeconds, setSelectedSeconds] = useState(initialTime);
	const [selectedIncrement, setSelectedIncrement] = useState(ctxIncrement);
	const [activeCategory, setActiveCategory] = useState(
		matchedPreset?.category ?? Categories.BLITZ
	);
	const [customMin, setCustomMin] = useState("");
	const [customSec, setCustomSec] = useState("");
	const [customInc, setCustomInc] = useState("");
	const [customActive, setCustomActive] = useState(!matchedPreset);

	const visiblePresets = TIME_CONTROLS.filter(
		(tc) => tc.category === activeCategory
	);

	function selectPreset(tc: TimeControl) {
		setSelectedSeconds(tc.seconds);
		setSelectedIncrement(tc.increment);
		setCustomActive(false);
		setCustomMin("");
		setCustomSec("");
		setCustomInc("");
	}

	function handleCustomChange(field: "min" | "sec" | "inc", val: string) {
		const num = parseInt(val, 10);
		if (field === "min") {
			setCustomMin(val);
			const m = isNaN(num) ? 0 : Math.min(num, 180);
			const s = parseInt(customSec, 10) || 0;
			const total = m * 60 + s;
			if (total > 0) { setSelectedSeconds(total); setCustomActive(true); }
		} else if (field === "sec") {
			setCustomSec(val);
			const m = parseInt(customMin, 10) || 0;
			const s = isNaN(num) ? 0 : Math.min(num, 59);
			const total = m * 60 + s;
			if (total > 0) { setSelectedSeconds(total); setCustomActive(true); }
		} else {
			setCustomInc(val);
			const inc = isNaN(num) ? 0 : Math.max(0, Math.min(num, 60));
			setSelectedIncrement(inc);
			setCustomActive(true);
		}
	}

	function handleConfirm() {
		if (selectedSeconds > 0) {
			setTimeControl(selectedSeconds, selectedIncrement);
			router.back();
		}
	}

	const isPresetSelected = (tc: TimeControl) =>
		!customActive &&
		tc.seconds === selectedSeconds &&
		tc.increment === selectedIncrement;

	function formatSelectedLabel() {
		const m = Math.floor(selectedSeconds / 60);
		const s = selectedSeconds % 60;
		const timeStr =
			selectedSeconds >= 3600
				? `${Math.floor(selectedSeconds / 3600)}h${selectedSeconds % 3600 > 0
					? ` ${Math.floor((selectedSeconds % 3600) / 60)}min`
					: ""
				}`
				: s > 0
					? `${m}min ${s}s`
					: `${m} min`;
		return selectedIncrement > 0
			? `${timeStr}  +${selectedIncrement}s / move`
			: timeStr;
	}

	return (
		<KeyboardAvoidingView
			style={styles.root}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={0}
		>
			<View
				style={[
					styles.container,
					{ paddingTop: insets.top + SPACING.lg, paddingBottom: insets.bottom + SPACING.lg },
				]}
			>
				<StatusBar hidden />

				<View style={styles.header}>
					<IconButton
						icon={X}
						accessibilityLabel="Close"
						onPress={() => router.back()}
					/>
					<Text variant="title">Time Control</Text>
					<View style={styles.headerSpacer} />
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scroll}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
				>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.tabsScroll}
						contentContainerStyle={styles.tabs}
						keyboardShouldPersistTaps="handled"
					>
						{CATEGORIES.map((cat) => (
							<Chip
								key={cat}
								label={cat}
								selected={cat === activeCategory}
								onPress={() => setActiveCategory(cat)}
							/>
						))}
					</ScrollView>

					<View style={styles.grid}>
						{visiblePresets.map((tc) => (
							<TimeControlButton
								key={`${tc.seconds}-${tc.increment}`}
								label={tc.label}
								sublabel={tc.increment === 0 ? "no increment" : `+${tc.increment}s / move`}
								selected={isPresetSelected(tc)}
								onPress={() => selectPreset(tc)}
							/>
						))}
					</View>

					<View style={styles.divider} />

					<Text variant="overline" color={COLORS.textSecondary} style={styles.sectionLabel}>
						CUSTOM
					</Text>

					<View style={styles.customRow}>
						<NumberField
							label="Minutes"
							value={customMin}
							onChangeText={(v) => handleCustomChange("min", v)}
							maxLength={3}
							highlighted={customActive && customMin !== ""}
						/>

						<Text variant="heading" color={COLORS.textMuted} style={styles.fieldSeparator}>:</Text>

						<NumberField
							label="Seconds"
							value={customSec}
							onChangeText={(v) => handleCustomChange("sec", v)}
							maxLength={2}
							highlighted={customActive && customSec !== ""}
						/>

						<Text variant="heading" color={COLORS.textMuted} style={styles.fieldSeparator}>+</Text>

						<NumberField
							label="Inc (s)"
							value={customInc}
							onChangeText={(v) => handleCustomChange("inc", v)}
							maxLength={2}
							highlighted={customActive && customInc !== ""}
						/>
					</View>

					<View style={styles.summary}>
						<Text variant="label" color={COLORS.textSecondary}>Selected</Text>
						<Text variant="heading">{formatSelectedLabel()}</Text>
					</View>
				</ScrollView>

				<Button
					variant="primary"
					size="lg"
					label="Set Time"
					onPress={handleConfirm}
					disabled={selectedSeconds === 0}
					style={styles.confirmBtn}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	container: {
		flex: 1,
		paddingHorizontal: SPACING.xl - SPACING.xs,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: SPACING.xl,
	},
	headerSpacer: {
		width: SIZES.touch,
	},
	scroll: {
		paddingBottom: SPACING.lg,
	},
	tabsScroll: {
		marginBottom: SPACING.lg + SPACING.xs,
		flexGrow: 0,
	},
	tabs: {
		flexDirection: "row",
		gap: SPACING.sm,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.md - SPACING.xs / 2,
	},
	divider: {
		height: 1,
		backgroundColor: COLORS.borderSubtle,
		marginVertical: SPACING.xl,
	},
	sectionLabel: {
		marginBottom: SPACING.md,
	},
	customRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: SPACING.sm,
		marginBottom: SPACING.xl,
	},
	fieldSeparator: {
		paddingBottom: SPACING.lg - 1,
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: SPACING.md,
	},
	confirmBtn: {
		marginTop: SPACING.lg,
	},
});
