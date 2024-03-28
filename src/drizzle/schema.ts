import { pgTable, text, numeric, char, integer, pgEnum, boolean, uuid } from "drizzle-orm/pg-core"

export const statusEnum = pgEnum('status', ['won', 'lost', 'inprogress'])

export const user = pgTable("User", {
	userId: numeric("userId").primaryKey().notNull(),
});

export const games = pgTable("Games", {
	gameId: uuid('gameId').primaryKey().defaultRandom(),
	channelId: numeric("channelId").notNull(),
	secretWord: text("secretWord").notNull(),
	creatorId: numeric("creatorId").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
	incorrectGuessesRemaining: integer("incorrectGuessesRemaining").default(10).notNull(),
	status: statusEnum('status').default("inprogress").notNull(),
	gameOver: boolean("gameOver").notNull().default(false),
});

export const guesses = pgTable("Guesses", {
	userId: numeric("userId").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
	guessId: uuid("guessId").primaryKey().defaultRandom(),
	guessedChar: char("guessedChar"),
	guessedWord: text("guessedWord"),
	isCorrect: boolean("isCorrect").notNull(),
	gameId: uuid("gameId").references(() => games.gameId, { onDelete: "cascade", onUpdate: "cascade" }),
});
