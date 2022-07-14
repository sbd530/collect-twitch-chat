import 'dotenv/config';
import { Client } from '@elastic/elasticsearch';

export const esClient = new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUDID
    },
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
    },
});
