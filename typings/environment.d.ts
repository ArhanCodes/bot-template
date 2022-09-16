eclare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Environment
            NODE_ENV: "development" | "production";

            // Meta
            DISCORD_TOKEN: string;
            MONGO_URI: string;

            // Webhooks
            CONSOLE_HOOK: string;
            GUILD_HOOK: string;

            // API Keys
            STATCORD_API_KEY: string;
            TOPGG_API_KEY: string;

            // Modules
            // soontm
        }
    }
}

export {};
