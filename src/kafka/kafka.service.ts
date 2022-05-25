import { Injectable, OnModuleInit, OnApplicationShutdown, Logger } from "@nestjs/common";
import { Kafka, Producer, Consumer, ConsumerRunConfig } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafkaInstance: Kafka;

  private producerConnected = false;
  private producer: Producer;

  private consumerConnected = false;
  private consumer: Consumer;

  private logger = new Logger('KafkaService');

  constructor() {
    this.kafkaInstance = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER],
      connectionTimeout: +process.env.KAFKA_CONNECTION_TIME_OUT,
      reauthenticationThreshold: +process.env.KAFKA_REAUTHENTICATIONTHRESHOLD,
    })

    this.producer = this.kafkaInstance.producer();
    this.consumer = this.kafkaInstance.consumer({
      groupId: process.env.KAFKA_GROUP_ID
    })
  }

  async connectionProducer() {
    try {
      await this.producer.connect();
      this.producerConnected = true
    } catch (e) {
      this.logger.error(`connection producer kafka error: ${e}`)
      this.producerConnected = false;
    }
  }

  async connectionConsumer() {
    try {
      await this.consumer.connect();
      this.consumerConnected = true
    } catch (e) {
      this.logger.error(`connection consumer kafka error: ${e}`)
      this.consumerConnected = false;
    }
  }

  async onModuleInit() {
    await this.connectionProducer();
    await this.connectionConsumer();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendConversationMessage<T extends any>(message: T) {
    if (!this.producerConnected) {
      await this.connectionProducer();
    }
    return await this.producer.send({
      topic: process.env.KAFKA_CONVERSATION_TOPIC,
      messages: [{ value: JSON.stringify(message) }]
    }).catch(e => {
      this.logger.error(`Send kafka error topic: conversation error:${e}, message: ${message}`)
    })
  }

  async consumerConversationMessage(config: ConsumerRunConfig) {
    await this.consumer.subscribe({ topics: [process.env.KAFKA_CONVERSATION_TOPIC], fromBeginning: false })
    await this.consumer.run(config)
  }
}
