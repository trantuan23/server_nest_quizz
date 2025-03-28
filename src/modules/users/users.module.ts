import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Classes } from '../classes/entities/classes.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Classes]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-secret-key', // Dùng biến môi trường hoặc mặc định
      signOptions: { expiresIn: '3h' }, // Token hết hạn sau 1 giờ
    }), 
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
