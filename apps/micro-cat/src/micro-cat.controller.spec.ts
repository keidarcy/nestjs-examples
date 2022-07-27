import { Test, TestingModule } from '@nestjs/testing';
import { MicroCatController } from './micro-cat.controller';
import { MicroCatService } from './micro-cat.service';

describe('MicroCatController', () => {
  let microCatController: MicroCatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroCatController],
      providers: [MicroCatService],
    }).compile();

    microCatController = app.get<MicroCatController>(MicroCatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(microCatController.getHello()).toBe('Hello World!');
    });
  });
});
