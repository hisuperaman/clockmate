import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING } from "@/constants/theme";

interface TimeControlButtonProps {
	label: string;
	sublabel?: string;
	selected: boolean;
	onPress: () => void;
}

export const TimeControlButton = ({ label, sublabel, selected, onPress }: TimeControlButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityState={{ selected }}
			style={[styles.base, selected && styles.selected]}
		>
			<Text variant="title" color={selected ? COLORS.onLight : COLORS.textPrimary}>
				{label}
			</Text>
			{sublabel && (
				<Text variant="caption" color={selected ? COLORS.onLightSecondary : COLORS.textSecondary}>
					{sublabel}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		width: "31%",
		minHeight: 84,
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.sm,
		borderRadius: RADII.md,
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
		backgroundColor: COLORS.surface,
		borderWidth: SIZES.borderWidth,
		borderColor: COLORS.border,
	},
	selected: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.white,
	},
});
