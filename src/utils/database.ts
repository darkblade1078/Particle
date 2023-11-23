import { Container } from '@sapphire/pieces';
import { Server } from '../entities';

export default class databaseUtils {

    private container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    async initializeServersDatabase(): Promise<void> {

        const { serverDatabase, servers, client, logger } = this.container;

        //get all servers from the database
        const serverData = await serverDatabase.find();

        //copy all data from database to cache
        serverData.map(server => {
            servers.set(server.serverId, server);
        });

        //add servers that the bot joined while it was offline
        client.guilds.cache.map(async server => {

            if (servers.get(server.id) == null) {

                const newServer = new Server();
                newServer.serverId = server.id;

                try {
                    await serverDatabase.insert(newServer);
                    logger.info(`Added Server: ${server.name}(${server.id}) to the database.`)
                }
                catch (err) {
                    logger.error(`Error occured in ready.ts: ${err}`);
                }

                servers.set(server.id, {
                    serverId: server.id
                });
            }
        });

        logger.info(`${servers.size} servers have been cached.`);
    }
}