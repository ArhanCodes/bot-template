# bot-template

A Discord bot template written in pure [Quill](https://github.com/tradebuddyhq/quill)

The whole bot lives in one file, [`bot.quill`](./bot.quill)

## Commands

- `/ping` returns the bot's latency
- `/ban` bans a user from the server
- `/kick` kicks a user from the server
- `/timeout` times out a user using Discord's native timeout, up to 28 days
- `/ticket setup` posts a ticket panel in the current channel. Members click the button to open a private channel with staff. `/ticket close` deletes the current ticket
- `/roles post` posts a role-selection embed with up to 5 roles. Members click a button to add or remove that role from themselves

Each moderation command checks Discord permissions and role hierarchy before acting

## Setup

1. Install Quill

```bash
npm install -g @tradebuddyhq/quill
```

2. Create a Discord application at https://discord.com/developers/applications and copy the bot token and the application client id

3. Invite the bot to your server with the `applications.commands` and `bot` scopes, plus the `Ban Members`, `Kick Members`, `Moderate Members`, `Manage Channels`, and `Manage Roles` permissions. Make sure the bot's role is above any role you plan to make self-assignable

4. Set environment variables

```bash
export DISCORD_TOKEN="your-bot-token"
export DISCORD_CLIENT_ID="your-application-client-id"
```

5. Install dependencies and run

```bash
npm install
quill run bot.quill
```

## What it looks like

```
bot.on("interactionCreate", with ix:
  if not ix.isChatInputCommand():
    give back nothing

  name is ix.commandName

  if name is "ping":
    sent is await ix.reply({content: "Pinging...", fetchReply: yes})
    roundTrip is sent.createdTimestamp - ix.createdTimestamp
    apiPing is Math.round(bot.ws.ping)
    await ix.editReply("Pong! Round-trip {roundTrip}ms, websocket {apiPing}ms.")
)
```

## Hosting

The included `Dockerfile` is all you need. It compiles the Quill source to JavaScript at build time, then runs a clean Node image at runtime

### Railway

1. Fork this repo
2. Go to https://railway.app, click New Project, then Deploy from GitHub Repo
3. Pick the fork
4. Add `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` as variables
5. Done

### Fly.io

```bash
fly launch
fly secrets set DISCORD_TOKEN=... DISCORD_CLIENT_ID=...
fly deploy
```

### Render

New, then Background Worker, then connect the repo, then add the two environment variables

### A VPS

```bash
git clone https://github.com/ArhanCodes/bot-template.git
cd bot-template
npm install -g @tradebuddyhq/quill
npm install
DISCORD_TOKEN=... DISCORD_CLIENT_ID=... quill run bot.quill
```

Use `pm2` or a systemd service to keep it running

## Adding a command

Two steps, both inside `bot.quill`

1. Build a new `SlashCommandBuilder` inside `buildCommands` and add `.toJSON()` of it to the returned list
2. Add an `if name is "yourcommand":` branch inside the `interactionCreate` handler

## License

MIT, see [LICENSE](./LICENSE)
