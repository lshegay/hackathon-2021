import express from 'express';
import next from 'next';

const PORT = process.env.PORT ?? 5000;
const DEV_MODE = process.env.NODE_ENV !== 'production';

const server = express();
const app = next({ dev: DEV_MODE });
const handle = app.getRequestHandler();

/**
 * Here you can do any other back-end code that has not to act with server code below.
*/

(async () => {
  /**
   * If you still need the async result of your code, you can write it here.
   * You can use Promise.all to execute all await code concurrently.
  */

  await app.prepare();

  server.use((req, res) => handle(req, res));
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}\nMODE: ${DEV_MODE ? 'development' : 'production'}`);
  });
})();
