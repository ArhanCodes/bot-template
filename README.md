# Bot-Template
A template for discord bots that are written in TypeScript. This is adapted from [Codeize's template](https://github.com/Codeize/template). 

### Creating Commands

-   Create a new file to `src/bot/slashCommands`.
-   Open your file.
-   Add this command template.

```ts
import { ChatInputCommandInteraction, Colors } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import ApplicationCommand from "../../../../lib/classes/ApplicationCommand.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

import Command from "../../structures/Command";
import DiscordClient from "../../structures/DiscordClient";

export default class ExampleCommand extends Command {
    constructor(client: DiscordClient) {
        super(
            client,
            {
                group: "Developer",
                require: {
                    developer: true,
                },
            },
            new SlashCommandBuilder().setName("example").setDescription("An example command.")
        );
    }

    async run(command: ChatInputCommandInteraction) {
        await command.reply("Wow, example command working!");
    }
}
```
> I've made an example `/ping` command [here](https://github.com/ArhanCodes/Bot-Template/blob/main/src/bot/slashCommands/ping.ts).
