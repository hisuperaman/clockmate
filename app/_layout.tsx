import { useFonts } from "expo-font";
import "@/global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { ClockProvider } from "@/contexts";
import { RoutePaths } from "@/enums";
import { COLORS } from "@/constants/colors";

const PoppinsRegular = require("@/assets/fonts/Poppins-Regular.ttf");
const PoppinsBlack = require("@/assets/fonts/Poppins-Black.ttf");
const PoppinsBold = require("@/assets/fonts/Poppins-Bold.ttf");
const PoppinsExtraBold = require("@/assets/fonts/Poppins-ExtraBold.ttf");
const PoppinsExtraLight = require("@/assets/fonts/Poppins-ExtraLight.ttf");
const PoppinsLight = require("@/assets/fonts/Poppins-Light.ttf");
const PoppinsMedium = require("@/assets/fonts/Poppins-Medium.ttf");
const PoppinsSemiBold = require("@/assets/fonts/Poppins-SemiBold.ttf");
const PoppinsThin = require("@/assets/fonts/Poppins-Thin.ttf");

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		poppins: PoppinsRegular,
		"poppins-black": PoppinsBlack,
		"poppins-bold": PoppinsBold,
		"poppins-extra-bold": PoppinsExtraBold,
		"poppins-extra-light": PoppinsExtraLight,
		"poppins-light": PoppinsLight,
		"poppins-medium": PoppinsMedium,
		"poppins-semibold": PoppinsSemiBold,
		"poppins-thin": PoppinsThin,
	});

	useEffect(() => {
		async function hideSplash() {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		}
		hideSplash();
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<ClockProvider>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: COLORS.background },
				}}
			>
				<Stack.Screen name={RoutePaths.index} />
				<Stack.Screen
					name={RoutePaths.setup}
					options={{
						headerShown: false,
						presentation: "modal",
						animation: "slide_from_bottom",
					}}
				/>
			</Stack>
		</ClockProvider>
	);
}