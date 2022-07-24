import { NestFactory } from '@nestjs/core';
import * as repl from 'repl';
import * as Logger from 'purdy';

const LOGGER_OPTIONS = {
  indent: 2,
  depth: 1,
};

class InteractiveNestJS {
  async run() {
    // create the application context
    const targetModule = require(`${__dirname}/app.module`);
    const applicationContext = await NestFactory.createApplicationContext(
      // tslint:disable-next-line: no-string-literal
      targetModule['AppModule'],
    );
    const awaitOutside = require('await-outside');
    // start node repl
    const server = repl.start({
      useColors: true,
      prompt: '> ',
      writer: replWriter,
      ignoreUndefined: true,
    });
    server.context.app = applicationContext;
    awaitOutside.addAwaitOutsideToReplServer(server);
  }
}

function replWriter(value: object): string {
  return Logger.stringify(value, LOGGER_OPTIONS);
}

const session = new InteractiveNestJS();
session.run();
