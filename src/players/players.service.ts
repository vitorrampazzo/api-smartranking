import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from '../players/interfaces/player.interface';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDocument } from './schemas/player.schema';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger('Player Service');

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<PlayerDocument>
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(`Recebido: ${JSON.stringify(createPlayerDto)}`);
    const { name, email, phoneNumber } = createPlayerDto;

    const player = await this.playerModel.create({
      name,
      email,
      phoneNumber,
      ranking: 'A',
      positionRanking: 0,
      urlPhotoPlayer: 'https://www.google.com.br/foto123.jpg',
    });

    return player;
  }

  async update(updatePlayerDto: UpdatePlayerDto, id: string): Promise<Player> {
    this.logger.log(`Recebido: ${JSON.stringify(updatePlayerDto)}`);

    const player = await this.playerModel.findOneAndUpdate(
      { _id: id },
      { $set: updatePlayerDto },
      { new: true }
    );

    if (!player) {
      throw new NotFoundException(`Jogador com o id ${id} não foi encontrado`);
    }

    return player;
  }

  async get(email?: string): Promise<Player[]> {
    let data = {};
    if (email) data = { email };

    const player = await this.playerModel.find(data);

    if (player.length === 0)
      throw new NotFoundException(
        `Jogador com o email ${email} não foi encontrado`
      );

    return player;
  }

  async delete(id: string): Promise<Player> {
    const player = await this.playerModel.findOneAndDelete({ _id: id });

    if (!player) {
      throw new NotFoundException(`Jogador com o id ${id} não foi encontrado`);
    }

    return player;
  }
}
