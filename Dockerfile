FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
RUN npm install -g @tradebuddyhq/quill
COPY bot.quill ./
RUN quill build bot.quill bot.js

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/bot.js ./bot.js
CMD ["node", "bot.js"]
