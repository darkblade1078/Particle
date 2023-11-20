import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new SapphireClient({
  intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  loadMessageCommandListeners: true
});

client.login(`${process.env.BOT_TOKEN}`);