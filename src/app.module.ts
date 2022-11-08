import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://rampazzo:rampazzo@localhost:27017/smartranking?authSource=admin&directConnection=true',
      {}
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
