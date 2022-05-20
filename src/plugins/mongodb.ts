import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb';

export default fp<FastifyMongodbOptions>(
  async (fastify: FastifyInstance, opts: FastifyMongodbOptions) => {
    await fastify.register(fastifyMongodb, {
      url: process.env.DB_CONNECTION_STRING,
    });
  }
);
