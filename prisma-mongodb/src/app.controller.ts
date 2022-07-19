import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

type GetUserInput = {
  readonly id: string;
};

type CreateUserInput = Readonly<Omit<Prisma.UserCreateInput, 'id'>>;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user/:id')
  async getUser(@Param() params: GetUserInput): Promise<User> {
    return await this.appService.findById(params);
  }

  @Post('/user')
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.appService.save(input);
  }
}
