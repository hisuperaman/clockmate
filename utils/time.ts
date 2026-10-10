export function formatTime(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const hoursString = hours > 0 ? `${String(hours).padStart(2, "0")}:` : "";
	return `${hoursString}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Short time control label, e.g. "3 + 2" or "1:30 + 0"
export function formatTimeControl(totalSeconds: number, increment: number): string {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const base = seconds > 0 ? `${minutes}:${String(seconds).padStart(2, "0")}` : `${minutes}`;
	return `${base} + ${increment}`;
}
