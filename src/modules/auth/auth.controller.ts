import { Body, Controller, HttpException, HttpStatus, Post, Req, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Đăng ký người dùng mới
    @Post('register')
    register(@Body() createUserDto: RegisterDto) {
        return this.authService.register(createUserDto);
    }

    // Đăng nhập và trả về access token
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // Refresh access token từ refresh token
    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refresh_token: string) {
        if (!refresh_token) {
            throw new UnauthorizedException('Refresh token không được để trống');
        }
        return this.authService.refreshAccessToken(refresh_token);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Post('verify-otp')
    async verifyOtp(@Body() verifyOtpDto: { email: string; otpCode: string }) {
        return this.authService.verifyOtp(verifyOtpDto.email, verifyOtpDto.otpCode);
    }

    @Post('verify-token')
    async verifyToken(@Body('refresh_token') refresh_token: string) {
        if (!refresh_token) {
            throw new UnauthorizedException('Token không được để trống.');
        }
        return this.authService.verifyToken(refresh_token);
    }


    @Post('logout')
    async logout(@Body() body: { userId: string }) {
        const { userId } = body;
        if (!userId) {
            throw new HttpException('User ID is missing', HttpStatus.BAD_REQUEST);
        }
        return this.authService.logout(userId);
    }


}


