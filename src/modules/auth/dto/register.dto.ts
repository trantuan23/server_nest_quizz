import { UserRole } from '@/modules/users/entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Tên người dùng không được để trống.' })
    username: string;

    @IsEmail({}, { message: 'Email không hợp lệ.' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
    password: string;

    @IsEnum(UserRole, { message: 'Vai trò không hợp lệ.' })
    role: UserRole;

    @IsOptional()
    classId: string; // Chỉ học sinh mới cần classId
}
