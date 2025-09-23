const amqp = require('amqplib');

class RabbitConsumer {
  constructor(url) {
    this.url = url;
    this.conn = null;
    this.channel = null;
  }

  async start(exchange, routingKey, handler) {
    this.conn = await amqp.connect(this.url);
    this.channel = await this.conn.createChannel();
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    const q = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(q.queue, exchange, routingKey);
    console.log(`Bound queue ${q.queue} to ${exchange} ${routingKey}`);
    this.channel.consume(q.queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await handler(content);
          this.channel.ack(msg);
        } catch (err) {
          console.error('Handler error', err);
          this.channel.nack(msg, false, false);
        }
      }
    });
  }
}

module.exports = RabbitConsumer;
