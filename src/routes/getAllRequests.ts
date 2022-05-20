import { ObjectId } from '@fastify/mongodb';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const pageSize = 10;
const getAllRequestsRoute = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) => {
  fastify.route({
    method: 'GET',
    url: '/fastiproxy/requests',
    handler: async (req, res) => {
      const page = (req.query as any).page ?? 1;
      const requests = await fastify.mongo.db
        ?.collection('requests')
        .find(
          {},
          {
            skip: (page - 1) * pageSize,
            limit: pageSize,
            sort: { date: 'desc' },
          }
        )
        .toArray();
      res.send(requests);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/fastiproxy/requests/:id',
    handler: async (req, res) => {
      const requests = await fastify.mongo.db?.collection('requests').findOne({
        _id: new ObjectId((req.params as any).id as string),
      });
      res.send(requests);
    },
  });
};

export default getAllRequestsRoute;
