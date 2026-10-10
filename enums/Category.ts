export const Categories = {
	BULLET: "bullet",
	BLITZ: "blitz",
	RAPID: "rapid",
	CLASSICAL: "classical"
}

export type Category = (typeof Categories)[keyof typeof Categories];