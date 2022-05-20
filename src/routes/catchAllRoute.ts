import fastifyReplyFrom from '@fastify/reply-from';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

const catchAll = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) => {
  fastify.register(fastifyReplyFrom, {
    base: process.env.REMOTE_URL,
  });

  fastify.addHook(
    'onSend',
    async (req, reply, payload: any): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        const chunks: any[] = [] as any[];

        payload.on('error', reject);

        payload.on('data', (chunk: any) => {
          chunks.push(chunk);
        });

        payload.on('end', async () => {
          const body = Buffer.concat(chunks);
          const responseData = JSON.parse(body.toString('utf-8'));

          await fastify.mongo.db?.collection('requests').insertOne({
            date: Date.now(),
            requestTime: reply.getResponseTime(),
            request: {
              method: req.method,
              url: req.url,
              headers: req.headers,
              body: req.body,
              queryString: req.query,
            },
            response: {
              statusCode: reply.statusCode,
              headers: reply.getHeaders(),
              body: responseData,
            },
          });

          resolve(body);
        });
      });
    }
  );

  fastify.route({
    method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'],
    url: '/*',
    handler: function (
      this: FastifyInstance,
      request: FastifyRequest,
      reply: FastifyReply
    ): void | Promise<unknown> {
      reply.from(request.url);
    },
  });
};

export default catchAll;
