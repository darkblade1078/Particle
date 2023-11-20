import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Command } from '@sapphire/framework';
import embeds from '../embeds';

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, { ...options });
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `Ping?`, fetchReply: true });
        const { client } = this.container;
        const embedCreator = new embeds(client);


        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(client.ws.ping);

            return interaction.editReply({ embeds: [embedCreator.default(`Pong!!`, `Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`)] });
        }

        return interaction.editReply({ embeds: [embedCreator.error('Failed to retrieve ping.')] });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('ping')
                .setDescription('Ping bot to see if it is alive')
        );
    }
}