import Config from "../../config/bot.config.js";
import BetterClient from "../../lib/extensions/BetterClient.js";

const client = new BetterClient({
    allowedMentions: { parse: ["users"] },
    presence: Config.presence,
    intents: Config.intents
});

client.login().catch(error => {
    client.logger.error(error);
});
