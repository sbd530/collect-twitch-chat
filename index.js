import tmi from 'tmi.js';
import { logger } from './config/winston.js';

const opts = {
    connection: {
        secure: true,
        reconnect: true,
    },
    channels: ['kimdoe'],
};

const client = new tmi.Client(opts);
client.on('connected', (addr, port) =>
    console.log(`# Connected to ${addr}:${port}`)
);
client.on('message', async (channel, tags, message, self) => {
    const user_id = tags['display-name'];
    const data = { user_id, message };
    logger.info(JSON.stringify(data));
});

client.connect();
