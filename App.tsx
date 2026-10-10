import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClockProvider } from "@/contexts";
import { ClockScreen, SetupScreen } from "@/screens";
import { COLORS } from "@/constants/colors";

const PoppinsMedium = require("@/assets/fonts/Poppins-Medium.ttf");
const PoppinsSemiBold = require("@/assets/fonts/Poppins-SemiBold.ttf");

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		"poppins-medium": PoppinsMedium,
		"poppins-semibold": PoppinsSemiBold,
	});
	const [setupOpen, setSetupOpen] = useState(false);

	useEffect(() => {
		async function hideSplash() {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		}
		hideSplash();
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	const closeSetup = () => setSetupOpen(false);

	return (
		<SafeAreaProvider style={styles.root}>
			<ClockProvider>
				<View style={styles.root}>
					<ClockScreen onOpenSetup={() => setSetupOpen(true)} />
				</View>

				<Modal
					visible={setupOpen}
					animationType="slide"
					onRequestClose={closeSetup}
					statusBarTranslucent
					navigationBarTranslucent
				>
					<SetupScreen onClose={closeSetup} />
				</Modal>
			</ClockProvider>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
});
