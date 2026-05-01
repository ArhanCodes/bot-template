# bot-template

A Discord bot template written in pure [Quill](https://github.com/tradebuddyhq/quill).

The whole bot is in **one file** ([`bot.quill`](./bot.quill)), about 100 lines of Quill source.

## Commands

| Command    | Description                                                  | Required permission |
| ---------- | ------------------------------------------------------------ | ------------------- |
| `/ping`    | Returns round-trip latency and websocket ping.               | none                |
| `/ban`     | Bans a user from the server.                                 | `BAN_MEMBERS`       |
| `/kick`    | Kicks a user from the server.                                | `KICK_MEMBERS`      |
| `/timeout` | Times out a user using Discord's native timeout (max 28 days). | `MODERATE_MEMBERS`  |

Each moderation command uses Discord's native permissions, role-hierarchy checks (`bannable`, `kickable`, `moderatable`), and posts a one-line audit entry to stdout.

## Setup

### 1. Install Quill

```sh
npm install -g @tradebuddyhq/quill
```

### 2. Create a Discord application

Go to <https://discord.com/developers/applications>, create an app, and grab:

- the **bot token** (Bot tab, Reset Token)
- the **application/client ID** (General Information tab)

Invite the bot to your server with the `applications.commands` and `bot` scopes, and at minimum the `Ban Members`, `Kick Members`, and `Moderate Members` permissions.

### 3. Configure environment

```sh
cp .env.example .env
# fill in DISCORD_TOKEN and DISCORD_CLIENT_ID
```

### 4. Install Node dependencies

```sh
npm install
```

### 5. Run

```sh
npm start          # quill run bot.quill
# or compile to JS first:
npm run build      # quill build bot.quill bot.js
node -r dotenv/config bot.js
```

The first launch registers the four slash commands globally. They can take up to an hour to appear in clients; for faster iteration during development, register against a single guild instead (see Discord's docs on guild-scoped command registration).

## Project layout

```
bot-template/
├── bot.quill        # The entire bot
├── package.json     # discord.js + dotenv
├── .env.example     # Token template
└── README.md
```

## Extending it

The bot uses Quill's standard interop with `discord.js`, so anything in [discord.js v14](https://discord.js.org/) is reachable via the `Discord` namespace. Add another command by:

1. Building a new `SlashCommandBuilder` inside `buildCommands` and adding `.toJSON()` of it to the returned array.
2. Adding an `if name is "yourcommand":` branch inside the `interactionCreate` handler.

## License

MIT, see [LICENSE](./LICENSE).
