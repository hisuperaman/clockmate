import { TextStyle } from "react-native";

export const FONTS = {
	regular: "poppins",
	medium: "poppins-medium",
	semibold: "poppins-semibold",
	bold: "poppins-bold",
} as const;

export const TYPOGRAPHY = {
	timer: { fontFamily: FONTS.semibold, fontSize: 84, lineHeight: 96, letterSpacing: -1 },
	title: { fontFamily: FONTS.semibold, fontSize: 20, lineHeight: 28 },
	heading: { fontFamily: FONTS.semibold, fontSize: 18, lineHeight: 26 },
	body: { fontFamily: FONTS.medium, fontSize: 16, lineHeight: 22 },
	label: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 20, letterSpacing: 0.3 },
	caption: { fontFamily: FONTS.medium, fontSize: 13, lineHeight: 18 },
	overline: { fontFamily: FONTS.semibold, fontSize: 13, lineHeight: 18, letterSpacing: 2 },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof TYPOGRAPHY;

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	xxl: 32,
} as const;

export const RADII = {
	sm: 10,
	md: 14,
	lg: 18,
	pill: 999,
} as const;

export const SIZES = {
	// Minimum comfortable touch target
	touch: 48,
	// Primary / large controls
	control: 56,
	icon: 22,
	borderWidth: 1.5,
} as const;
