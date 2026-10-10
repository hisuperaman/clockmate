import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY, TypographyVariant } from "@/constants/theme";

export interface TextProps extends RNTextProps {
	variant?: TypographyVariant;
	color?: string;
}

export const Text = ({ variant = "body", color = COLORS.textPrimary, style, ...props }: TextProps) => {
	return <RNText {...props} style={[TYPOGRAPHY[variant], { color }, style]} />;
}
