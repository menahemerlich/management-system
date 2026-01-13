import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'db/database.module';
import { usersProviders } from './entities/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, 
    ...usersProviders
  ],
})
export class UsersModule {}
