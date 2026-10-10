import { Category } from "@/enums";

export interface TimeControl {
	label: string;
	category: Category;
	seconds: number;
	increment: number;
}