import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING } from "@/constants/theme";

interface IconButtonProps {
	icon: LucideIcon;
	onPress: () => void;
	accessibilityLabel: string;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
}

export const IconButton = ({
	icon: Icon,
	onPress,
	accessibilityLabel,
	disabled = false,
	style,
}: IconButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{ disabled }}
			hitSlop={SPACING.xs}
			style={[styles.base, disabled && styles.disabled, style]}
		>
			<Icon size={SIZES.icon} color={COLORS.textPrimary} strokeWidth={2.25} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		width: SIZES.touch,
		height: SIZES.touch,
		borderRadius: RADII.pill,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.surface,
		borderWidth: SIZES.borderWidth,
		borderColor: COLORS.border,
	},
	disabled: {
		opacity: 0.35,
	},
});
