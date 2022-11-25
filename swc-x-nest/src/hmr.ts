import chokidar from 'chokidar';
import { INestApplication, Logger } from '@nestjs/common';
import path from 'path';
import nestCliConfig from '../nest-cli.json';

const SRC_PATH = path.resolve(nestCliConfig.sourceRoot);
const MAIN_PATH = path.resolve(SRC_PATH, 'main.ts');

class HMR {
  private app: INestApplication;
  private logger = new Logger('HMR');

  constructor() {
    const debouncedReload = this.debounce(this.reload.bind(this));
    chokidar.watch(`${SRC_PATH}/**/*.ts`).on('change', debouncedReload);

    process.on('unhandledRejection', (reason) => {
      this.logger.error('unhandledRejection Error:' + reason);
    });
  }

  async reload() {
    this.logger.warn('Starting HMR cycle');

    await this.executeAndLogWithDuration('Finished HMR cycle', async () => {
      // delete all require caches for SRC_PATH
      // TODO: check how to handle node_modules
      for (const key in require.cache) {
        if (key.includes(SRC_PATH)) delete require.cache[key];
      }

      // get fresh instance of main
      const { bootstrap } = await import(MAIN_PATH);

      // close server if running
      if (this.app) {
        await this.executeAndLogWithDuration('Closed server', this.app.close);
        console.log('\n');
      }

      // reinitialize server
      await this.executeAndLogWithDuration('Started Server', async () => {
        this.app = await bootstrap();
      });
    });
  }

  async executeAndLogWithDuration(msg: string, cb: () => Promise<any>) {
    const start = performance.now();

    await cb();

    const duration = Number(performance.now() - start).toFixed(0);
    this.logger.warn(`${msg} +${duration}ms`);
  }

  debounce(cb: () => void, delay = 500) {
    let id: NodeJS.Timeout;
    return () => {
      if (id) globalThis.clearTimeout(id);
      id = globalThis.setTimeout(() => {
        cb();
      }, delay);
    };
  }
}

const hmr = new HMR();
hmr.reload().catch((err) => {
  console.error('HMR reload failed', err);
});
