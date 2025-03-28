import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateIf } from "class-validator";

// Role Enum
export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsEnum(UserRole, { message: 'Role must be student, teacher, or admin' })
    role: UserRole;

    // Chỉ yêu cầu classId nếu role là STUDENT
    @ValidateIf((o) => o.role === UserRole.STUDENT)
    @IsNotEmpty({ message: 'Học sinh phải được chỉ định vào một lớp' })
    classId: string;

}
