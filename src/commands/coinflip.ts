import { Command } from '@sapphire/framework';
import embeds from '../embeds';

export class CoinFlipCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, { ...options });
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const { client } = this.container;
        const embedCreator = new embeds(client);
        await interaction.deferReply();

        const playerChoice = interaction.options.getInteger(`choice`, true);
        const coin = Math.floor(Math.random() * 2);

        let guess;
        let coinFlip;

        switch (coin) {

            case 0:
                playerChoice == coin ? guess = "Correct!!!" : guess = "Wrong!!!";
                coinFlip = "The coin landed on heads"
                break;

            default:
                playerChoice == coin ? guess = "Correct!!!" : guess = "Wrong!!!";
                coinFlip = "The coin landed on tails"
                break;
        }

        return interaction.editReply({ embeds: [embedCreator.default(guess, coinFlip)] });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('coinflip')
                .setDescription('Guess if the coin is going to land on heads or tails')
                .addIntegerOption(option =>
                    option
                        .setName('choice')
                        .setDescription('Whether the coin will land on heads or tails')
                        .setRequired(true)
                        .addChoices(
                            { name: 'heads', value: 0 },
                            { name: 'tails', value: 1 },
                        )
                )
        );
    }
}