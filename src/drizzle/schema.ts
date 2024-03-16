import { sqliteTable, numeric, integer, text } from "drizzle-orm/sqlite-core"

export const user = sqliteTable("User", {
	userId: numeric("userId").primaryKey().notNull(),
	gamesStarted: integer("gamesStarted").default(1).notNull(),
});

export const games = sqliteTable("Games", {
	gameId: numeric("gameId").primaryKey(),
	channelId: numeric("channelId").notNull(),
	secretWord: numeric("secretWord").notNull(),
	creatorId: numeric("creatorId").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" } ),
	incorrectGuessesRemaining: integer("incorrectGuessesRemaining").default(10).notNull(),
	status: text("status").default("ongoing").notNull(),
	gameOver: numeric("gameOver").notNull(),
});

export const guesses = sqliteTable("Guesses", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: numeric("userId").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" } ),
	guessId: numeric("guessId"),
	guessedChar: numeric("guessedChar"),
	guessedWord: numeric("guessedWord"),
	isCorrect: numeric("isCorrect").notNull(),
	gameId: numeric("gameId").references(() => games.gameId, { onDelete: "cascade", onUpdate: "cascade" } ),
});
