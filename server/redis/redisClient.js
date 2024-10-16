const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

async function connectRedis() {
    try {
        if (!client.isOpen) { // Check if Redis is already connected
            await client.connect();
            console.log('Redis connected successfully');
        }
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

connectRedis(); // Connect Redis once when the app starts

module.exports = client;
