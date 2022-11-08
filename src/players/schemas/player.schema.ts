import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  ranking: string;

  @Prop()
  positionRanking: number;

  @Prop()
  urlPhotoPlayer: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
