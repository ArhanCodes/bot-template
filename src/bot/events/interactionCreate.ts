import { ChatInputCommandInteraction, ContextMenuCommandInteraction, Interaction, InteractionType } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler.js";
import mongoose from "mongoose";

export default class InteractionCreate extends EventHandler {
    override async run(interaction: Interaction) {
        this.client.logger.info(
            `${interaction.type} interaction created by ${interaction.user.id}${
                interaction.type === InteractionType.ApplicationCommand ? `: ${interaction.toString()}` : ""
            }`
        );
        // @ts-ignore
        if (mongoose.connection.readyState !== mongoose.STATES.connected)
            // @ts-ignore
            return interaction.reply(
                this.client.functions.generateErrorMessage({
                    title: "Not Ready",
                    description:
                        "I'm not ready yet, please try again in a moment!"
                })
            );
        if (interaction.type === InteractionType.ApplicationCommand || interaction.type === InteractionType.MessageComponent) {
            this.client.stats.commandsRun++;
            return this.client.applicationCommandHandler.handleCommand(
                interaction as ChatInputCommandInteraction | ContextMenuCommandInteraction
            );
        } else if (interaction.isButton())
            return this.client.buttonHandler.handleButton(interaction);
        else if (interaction.isSelectMenu())
            return this.client.dropDownHandler.handleDropDown(interaction);
        else if (interaction.type === InteractionType.ApplicationCommandAutocomplete)
            return this.client.autoCompleteHandler.handleAutoComplete(
                interaction
            );
        else if (interaction.type === InteractionType.ModalSubmit) return;
        const error = new Error("Invalid Interaction: Never seen this before.");
        this.client.logger.error(error);
        // @ts-ignore
        return interaction.reply(
            this.client.functions.generateErrorMessage({
                title: "Invalid Interaction",
                description: "I've never seen this type of interaction"
            })
        );
    }
}
