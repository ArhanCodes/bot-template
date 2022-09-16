import { GatewayIntentBits, PermissionsString, PresenceData } from "discord.js";

export default {
    prefixes: process.env.NODE_ENV === "production" ? ["!"] : ["!!"],
    botName: "",

    version: "1.0.0",
    admins: [""],

    // If your bot isn't public, or open source, you can remove the below values.
    supportServer: "",
    minimalInvite: "",
    gitHub: "",

    presence: {
        status: "online",
        activities: [
            {
                type: "PLAYING",
                name: "with /help"
            }
        ]
    } as unknown as PresenceData,

    hastebin: "https://h.otterbots.xyz",

    colors: {
        primary: "5865F2",
        success: "57F287",
        warning: "FEE75C",
        error: "ED4245"
    },

    // https://discordjs.guide/popular-topics/intents.html#enabling-intents
    intents: [GatewayIntentBits.Guilds],

    // https://discord.com/developers/docs/topics/permissions
    // TODO: Fix the 'as unknown' thing, not sure why it's throwing but it's probably me.
    requiredPermissions: [
        "EMBED_LINKS",
        "SEND_MESSAGES",
        "USE_EXTERNAL_EMOJIS"
    ] as unknown as PermissionsString[],
};
