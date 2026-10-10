import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { Text } from "./Text";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface ButtonProps {
	label: string;
	onPress: () => void;
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: LucideIcon;
	disabled?: boolean;
	accessibilityLabel?: string;
	style?: StyleProp<ViewStyle>;
}

export const Button = ({
	label,
	onPress,
	variant = "secondary",
	size = "md",
	icon: Icon,
	disabled = false,
	accessibilityLabel,
	style,
}: ButtonProps) => {
	const isPrimary = variant === "primary";
	const fg = isPrimary ? COLORS.onLight : COLORS.textPrimary;

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel ?? label}
			accessibilityState={{ disabled }}
			hitSlop={SPACING.xs}
			style={[
				styles.base,
				size === "lg" ? styles.lg : styles.md,
				isPrimary ? styles.primary : styles.secondary,
				disabled && styles.disabled,
				style,
			]}
		>
			{Icon && <Icon size={SIZES.icon} color={fg} strokeWidth={2.25} />}
			<Text variant={size === "lg" ? "heading" : "label"} color={fg}>
				{label}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING.sm,
		borderWidth: SIZES.borderWidth,
	},
	md: {
		minHeight: SIZES.touch,
		paddingHorizontal: SPACING.lg + SPACING.xs,
		borderRadius: RADII.pill,
	},
	lg: {
		minHeight: SIZES.control + SPACING.xs,
		paddingHorizontal: SPACING.xl,
		borderRadius: RADII.lg,
	},
	primary: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.white,
	},
	secondary: {
		backgroundColor: COLORS.surface,
		borderColor: COLORS.border,
	},
	disabled: {
		opacity: 0.35,
	},
});
