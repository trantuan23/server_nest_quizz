import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from '../users/entities/user.entity';
import { Classes } from '../classes/entities/classes.entity';
import { UsersController } from '../users/users.controller';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Thêm ConfigModule vào imports
    TypeOrmModule.forFeature([Users, Classes]),
    UsersModule, // ✅ Import UsersModule để dùng UsersService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, JwtStrategy, AuthService],
  exports: [JwtModule, AuthService], // ✅ Xuất AuthService để module khác có thể dùng
})
export class AuthModule {}
