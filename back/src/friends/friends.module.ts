import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [FriendsService],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
