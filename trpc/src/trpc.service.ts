import { initTRPC } from '@trpc/server';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user.service';

@Injectable()
export class TRPCService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  // Singleton scope is used for injection by default so `t` is created only once
  t = initTRPC.create();

  appRouter = this.t.router({
    users: this.t.procedure.query(async (opts) => {
      // Here we can use providers injected by NestJS in our procedures
      return this.userService.getHello();
    }),
  });

  applyMiddleware(app: NestExpressApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}
