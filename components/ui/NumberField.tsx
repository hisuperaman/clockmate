import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "./Text";
import { COLORS } from "@/constants/colors";
import { RADII, SIZES, SPACING, TYPOGRAPHY } from "@/constants/theme";

interface NumberFieldProps {
	label: string;
	value: string;
	onChangeText: (value: string) => void;
	maxLength: number;
	highlighted?: boolean;
}

export const NumberField = ({ label, value, onChangeText, maxLength, highlighted = false }: NumberFieldProps) => {
	return (
		<View style={styles.field}>
			<Text variant="caption" color={COLORS.textSecondary}>
				{label}
			</Text>
			<TextInput
				style={[styles.input, highlighted && styles.inputHighlighted]}
				placeholder="0"
				placeholderTextColor={COLORS.textPlaceholder}
				keyboardType="number-pad"
				value={value}
				onChangeText={onChangeText}
				maxLength={maxLength}
				returnKeyType="done"
				accessibilityLabel={label}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		flex: 1,
		alignItems: "center",
		gap: SPACING.sm,
	},
	input: {
		fontFamily: TYPOGRAPHY.heading.fontFamily,
		fontSize: TYPOGRAPHY.heading.fontSize,
		width: "100%",
		height: SIZES.control,
		paddingVertical: 0,
		textAlign: "center",
		color: COLORS.textPrimary,
		borderRadius: RADII.md,
		backgroundColor: COLORS.surface,
		borderWidth: SIZES.borderWidth,
		borderColor: COLORS.border,
	},
	inputHighlighted: {
		color: COLORS.onLight,
		backgroundColor: COLORS.white,
		borderColor: COLORS.white,
	},
});
