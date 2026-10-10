export const RoutePaths = {
	index: "index",
	setup: "setup",
}

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];