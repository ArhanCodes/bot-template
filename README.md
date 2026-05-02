# bot-template

A Discord bot template written in pure [Quill](https://github.com/tradebuddyhq/quill)

The whole bot lives in one file, [`bot.quill`](./bot.quill)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?repository=https://github.com/ArhanCodes/bot-template)

## Commands

- `/ping` returns the bot's latency
- `/help` lists every command
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

3. Invite the bot. Replace `YOUR_CLIENT_ID` with your application client id and open the link in a browser

```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=1099780156438&scope=bot+applications.commands
```

The permission integer covers Ban Members, Kick Members, Moderate Members, Manage Channels, Manage Roles, Manage Messages, View Channel, Send Messages, Embed Links, and Read Message History. Drag the bot's role above any role you plan to make self-assignable

4. Create a `.env` file. Copy `.env.example` and fill in the values

```
DISCORD_TOKEN=your-bot-token
DISCORD_CLIENT_ID=your-application-client-id
GUILD_ID=
```

`GUILD_ID` is optional. If you set it during development, slash commands register to that one server and update instantly. Leave it blank in production to register globally (which can take up to an hour to propagate)

5. Install dependencies and run

```bash
npm install
quill run bot.quill
```

You should see `Logged in as your-bot#0000` and `Registered 7 commands ...` in the terminal

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

1. Click the Deploy on Railway button at the top of this README
2. Add `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` as variables
3. Done

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

## Setting environment variables on different shells

Bash, zsh, or a `.env` file are easiest. If you must set them in a shell session

- macOS or Linux: `export DISCORD_TOKEN=...`
- Windows PowerShell: `$env:DISCORD_TOKEN="..."`
- Windows CMD: `set DISCORD_TOKEN=...`

The `dotenv/config` import in `bot.quill` reads `.env` automatically so you usually do not need any of these

## Adding a command

Two steps, both inside `bot.quill`

1. Build a new `SlashCommandBuilder` inside `buildCommands` and add `.toJSON()` of it to the returned list
2. Add an `if name is "yourcommand":` branch inside the `interactionCreate` handler

## License

MIT, see [LICENSE](./LICENSE)
