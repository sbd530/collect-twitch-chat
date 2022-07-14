import { esClient } from './es.client.js';

export async function insert(room = "", id = "", message = "") {
    await esClient.index({
        index: room,
        body: {
            character: id,
            quote: message,
        }
    });
}

async function run() {
    await esClient.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await esClient.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await esClient.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs whetstone.'
        }
    })

    await esClient.indices.refresh({ index: 'game-of-thrones' })
}

async function read() {
    const resp = await esClient.search({
        index: 'game-of-thrones',
        body: {
            query: {
                match: { quote: 'Winter' }
            }
        }
    });
    console.log(resp.hits.hits);
}

run()
    .then(read)
    .catch(console.log);
// read().catch(console.log);