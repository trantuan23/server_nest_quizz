import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Classes } from '../classes/entities/classes.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        @InjectRepository(Classes)
        private readonly classRepository: Repository<Classes>,
    ) { }

    // Đăng ký người dùng mới
    async register(registerDto: RegisterDto): Promise<Users> {
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new BadRequestException('Email đã được sử dụng.');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        const foundClass = await this.classRepository.findOne({ where: { class_id: registerDto.classId } });
        if (!foundClass) {
            throw new BadRequestException({
                message: `Lớp học với ID ${registerDto.classId} không tồn tại.`,
                code: 'CLASS_NOT_FOUND'
            });
        }

        const user = this.userRepository.create({ ...registerDto, password: hashedPassword, class: foundClass });
        return this.userRepository.save(user);
    }

    // Đăng nhập và cấp access_token
    async login(loginDto: LoginDto): Promise<{ access_token: string; role: string, user_id: string, user_name: string }> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

        if (!user) {
            throw new UnauthorizedException('Email không tồn tại !.');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Tài khoản chưa được kích hoạt.');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng.');
        }

        const payload = { userId: user.user_id };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '4h',
        });

        await this.userRepository.update(user.user_id, { refresh_token: accessToken });

        return {
            access_token: accessToken,
            role: user.role, // Trả về role của user
            user_id: user.user_id,
            user_name: user.username
        };
    }


    // Refresh access token từ refresh token
    async refreshAccessToken(refresh_token: string): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { refresh_token } });
        if (!user) {
            throw new UnauthorizedException('Refresh token không hợp lệ.');
        }

        try {
            // Xác minh refresh token
            const payload = this.jwtService.verify(refresh_token);
            const newAccessToken = this.jwtService.sign({ userId: user.user_id }, { expiresIn: '15m' });
            return { access_token: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token hết hạn hoặc không hợp lệ.');
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { email: forgotPasswordDto.email } });
        if (!user) {
            throw new NotFoundException('Email không tồn tại.');
        }

        // Tạo mã OTP (6 số)
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Lưu mã OTP vào DB (tùy chọn thêm thời gian hết hạn)
        await this.userRepository.update(user.user_id, { code_otp: otpCode });

        // Gửi email
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Yêu cầu đặt lại mật khẩu',
            template: './reset-password', // Template email (tạo trong thư mục templates)
            context: { name: user.username, otpCode },
        });

        return { message: 'Mã OTP đặt lại mật khẩu đã được gửi đến email của bạn.' };
    }

    async verifyOtp(email: string, otpCode: string): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { email, code_otp: otpCode } });
        if (!user) {
            throw new BadRequestException('Mã OTP không hợp lệ hoặc email không đúng.');
        }

        return { message: 'Mã OTP hợp lệ.' };
    }

    async resetPassword(updatePasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        const { email, otpCode, newPassword } = updatePasswordDto;

        // Kiểm tra OTP trước khi cập nhật mật khẩu
        const user = await this.userRepository.findOne({ where: { email, code_otp: otpCode } });
        if (!user) {
            throw new BadRequestException('Mã OTP không hợp lệ hoặc email không đúng.');
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu và xóa mã OTP
        await this.userRepository.update(user.user_id, {
            password: hashedPassword,
            code_otp: null,
        });

        return { message: 'Mật khẩu đã được đặt lại thành công.' };
    }

    async verifyToken(refresh_token: string): Promise<{ valid: boolean; user?: any }> {
        try {
            const decoded = this.jwtService.verify(refresh_token, { secret: process.env.JWT_SECRET }); // THÊM SECRET
            const user = await this.userRepository.findOne({ where: { user_id: decoded.userId } });

            if (!user) {
                throw new UnauthorizedException('Người dùng không tồn tại.');
            }

            return { valid: true, user };
        } catch (error) {
            throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn.');
        }
    }

    async logout(userId: string): Promise<{ message: string }> {
        if (!userId) {
            throw new HttpException('User ID is missing', HttpStatus.BAD_REQUEST);
        }

        const result = await this.userRepository.update({ user_id: userId }, { refresh_token: null });

        if (result.affected === 0) {
            throw new HttpException('User not found or not updated', HttpStatus.NOT_FOUND);
        }

        return { message: 'Đăng xuất thành công' };
    }




}
