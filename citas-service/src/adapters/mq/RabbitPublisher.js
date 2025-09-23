const amqp = require('amqplib');

class RabbitPublisher {
  constructor() {
    this.url = process.env.RABBITMQ_URL;
    this.conn = null;
    this.channel = null;
  }

  async connect() {
    if (this.conn) return;
    this.conn = await amqp.connect(this.url);
    this.channel = await this.conn.createChannel();
  }

  async publish(exchange, routingKey, message) {
    await this.connect();
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
  }
}

module.exports = RabbitPublisher;
