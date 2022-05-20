import 'module-alias/register';
import fastify from 'fastify';
import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';
import app from './app';

const schema = Type.Strict(
  Type.Object(
    {
      PORT: Type.Number({ default: 3000 }),
      LOG_LEVEL: Type.String({ default: 'error' }),
      REMOTE_URL: Type.String(),
      DB_CONNECTION_STRING: Type.String(), // format: 'uri'
    },
    { additionalProperties: true }
  )
);

const config = envSchema<Static<typeof schema>>({
  schema,
  dotenv: true,
});

const server = fastify({
  logger: {
    level: config.LOG_LEVEL,
  },
});

server.register(app);

server.listen(config.PORT || 3000, '0.0.0.0', async (err: any) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
