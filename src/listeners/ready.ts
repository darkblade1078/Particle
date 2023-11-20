import { Listener } from '@sapphire/framework';
import { ActivityType, type Client } from 'discord.js';

export class ReadyListener extends Listener {

    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready'
        });
    }

    public run(client: Client): void {
        const { logger } = this.container;
        const { username, id } = client.user!;
        logger.info(`Successfully logged in as ${username} (${id})`);

        //set bot activity
        client.user?.setActivity(`${client.guilds.cache.size} servers`, {
            type: ActivityType.Watching,
        });
    }
}