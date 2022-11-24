import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// const dotenv = require('dotenv');

// dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //console.log("Starting on port", process.env.PORT)
  await app.listen(4000);
  
}
bootstrap();
