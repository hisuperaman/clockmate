import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING } from "@/constants/theme";

interface ChipProps {
	label: string;
	selected: boolean;
	onPress: () => void;
}

export const Chip = ({ label, selected, onPress }: ChipProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			accessibilityRole="tab"
			accessibilityState={{ selected }}
			style={[styles.base, selected && styles.selected]}
		>
			<Text
				variant="label"
				color={selected ? COLORS.onLight : COLORS.textSecondary}
				style={styles.text}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		minHeight: SIZES.touch,
		paddingHorizontal: SPACING.lg + SPACING.xs,
		borderRadius: RADII.pill,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.surface,
		borderWidth: SIZES.borderWidth,
		borderColor: COLORS.border,
	},
	selected: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.white,
	},
	text: {
		textTransform: "capitalize",
	},
});
