import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from '../../dist/players/interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  async get(@Query('email') email: string): Promise<Player[]> {
    return this.playersService.get(email);
  }

  @Put(':id')
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string
  ): Promise<Player> {
    return this.playersService.update(updatePlayerDto, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Player> {
    return this.playersService.delete(id);
  }
}
