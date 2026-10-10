import { ClockContext, ClockContextType } from "@/contexts";
import { useContext } from "react";

export const useClock = (): ClockContextType => {
	const context = useContext(ClockContext);
	if (!context) throw new Error("useClock must be used inside ClockProvider");
	return context;
}