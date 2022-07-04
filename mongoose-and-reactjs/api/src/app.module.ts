import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const MONGO_URI = 'mongodb://127.0.0.1:27017/nest-test';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
