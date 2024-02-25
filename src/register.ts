import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";

export async function register(token:string, client_id:string, cmd:RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
    const rest = new REST().setToken(token)
    try {
        const data:any = rest.put(
            Routes.applicationCommands(client_id),
            {body: cmd}
            ).then(() => console.log(`Successfully created the application (/) command.`))

    } catch (error) {
        console.error(error);
    }
}