const Redis = require('ioredis');

// اتصال به ردیس (پیش‌فرض localhost:6379)
const redis = new Redis({
    host: "127.0.0.1",
    port: 6379
  });

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis;