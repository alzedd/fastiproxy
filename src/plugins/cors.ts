import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { FastifyCorsOptions } from '@fastify/cors';
import fastifyCors from '@fastify/cors';

export default fp<FastifyCorsOptions>(
  async (fastify: FastifyInstance, opts: FastifyCorsOptions) => {
    fastify.register(fastifyCors, {
      origin: '*',
      methods: '*',
    });
  }
);
