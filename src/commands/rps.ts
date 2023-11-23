import { Command } from '@sapphire/framework';
import embeds from '../embeds';

export class RpsCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, { ...options });
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const { client } = this.container;
        const embedCreator = new embeds(client);
        await interaction.deferReply();

        const emojis = ['✊', '✋', '✌️'];
        const playerChoice = interaction.options.getInteger(`choice`, true);
        const botChoice = Math.floor(Math.random() * 3);
        let winner;

        if((playerChoice+1) % 3 == botChoice)
            winner = "You Lose!!!";
        else if(playerChoice == botChoice)
            winner = "It's A Tie!!!";
        else
            winner = "You Win!!!";

        return interaction.editReply({ embeds: [embedCreator.default(winner, `**Your choice:** ${emojis[playerChoice]}\n\n**Bot choice:** ${emojis[botChoice]}`)]});
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('rps')
                .setDescription('Play rock paper scizzors with the bot')
                .addIntegerOption(option =>
                    option
                        .setName('choice')
                        .setDescription('Whether you pick rock, paper, or scizzors')
                        .setRequired(true)
                        .addChoices(
                            { name: '✊', value: 0 },
                            { name: '✋', value: 1 },
                            { name: '✌️', value: 2 },
                        )
                )
        );
    }
}