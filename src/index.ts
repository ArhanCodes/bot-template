import { load } from "dotenv-extended";
import { ShardingManager } from "discord.js";
import { ShardingClient } from "statcord.js";
import { AutoPoster } from "topgg-autoposter"
import Config from "../config/bot.config.js";
import Logger from "../lib/classes/Logger.js";

load({
    path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod"
});

const version =
    process.env.NODE_ENV === "development"
        ? `${Config.version}-dev`
        : Config.version;

const manager = new ShardingManager("./dist/src/bot/bot.js", {
    token: process.env.DISCORD_TOKEN
});

Logger.info(`Starting ${Config.botName} ${version}`);

manager.spawn({
    timeout: -1
});

manager.on("shardCreate", shard => {
    Logger.info(`Starting Shard ${shard.id}.`);
    if (shard.id + 1 === manager.totalShards) {
        shard.once("ready", () => {
            setTimeout(() => {
                Logger.info("All shards are online and ready!");
            }, 200);
        });
    }
});

if (process.env.NODE_ENV !== "development") {
    const autoposter = AutoPoster(`${process.env.TOPGG_API_KEY}`, manager)

    autoposter.on('posted', (stats) => {
        Logger.info(`Posted ${stats.serverCount} servers to Top.gg.`)
    })
}

const statcord = new ShardingClient({
    key: `${process.env.STATCORD_API_KEY}`,
    manager,
    postCpuStatistics: true, // Whether to post CPU statistics or not.
    postMemStatistics: true, // Whether to post memory statistics or not.
    postNetworkStatistics: true, // Whether to post memory statistics or not.
    autopost: true
});

statcord.on("autopost-start", () => {
    Logger.info("Started Statcord autopost.");
});

statcord.on("post", status => {
    if (!status) Logger.info("Successful Statcord post!");
    else Logger.error(status);
});
