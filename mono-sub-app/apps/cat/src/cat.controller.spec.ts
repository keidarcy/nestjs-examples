import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

describe('CatController', () => {
  let catController: CatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    catController = app.get<CatController>(CatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(catController.getHello()).toBe('Hello World!');
    });
  });
});
