import { ActivityType, Client, Events, GatewayIntentBits } from "discord.js";
import { register } from "./register.js";
import * as startGame from "./commands/startGame.js";
import * as guess from './commands/guess.js'
import { userExists, createUser } from './drizzle/userMgmt.js'

//Load the login details
const token = process.env.TOKEN
const client_id = process.env.CLIENT_ID

//Check if the details are there. If not, close.
if (!token) { console.error('Please provide a discord bot token in the environment variable "TOKEN".'); process.exit() }
if (!client_id) { console.error('Please provide the discord client_id from the same application as the bot in the environment variable "CLIENT_ID".'); process.exit() }

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands: any = []

commands.push(startGame.command.toJSON())
commands.push(guess.command.toJSON())

await register(token, client_id, commands)

client.once(Events.ClientReady, async c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setActivity("anime", { type: ActivityType.Watching })
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    // Check if the user exists. If not, create a new entry in the database.
    const userid = interaction.user.id
    const existance = await userExists(userid)
    if (existance === false) await createUser(userid)

    if (interaction.commandName === 'hangman') await startGame.execute(interaction)
    else if (interaction.commandName === 'guess') await guess.execute(interaction)
})


client.login(token);

export { client }
