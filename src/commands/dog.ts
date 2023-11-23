import { Command } from '@sapphire/framework';
import embeds from '../embeds';
import miscApis from '../apis/misc';

export class DogCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, { ...options });
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const { client, logger } = this.container;
        const embedCreator = new embeds(client);
        const miscApi = new miscApis();

        await interaction.deferReply();

        const response = await miscApi.randomDogApi();

        if (response.status == "Failed") {
            logger.error(response.message);
            return interaction.editReply({ embeds: [embedCreator.error(response.message)] });
        }

        return interaction.editReply({ embeds: [embedCreator.image(response.message)] });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('dog')
                .setDescription('Get a random image of a dog')
        );
    }
}