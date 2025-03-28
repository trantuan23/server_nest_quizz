import { Controller, Post, Body, Res, HttpStatus, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Response } from 'express';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/roles.guard';
import { UserRole } from '@/modules/users/entities/user.entity';
import { Roles } from '@/modules/auth/roles.decorator';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) { }

  // ✅ API sao lưu database
  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createBackup(@Res() res: Response) {
    try {
      const result = await this.backupService.backupDatabase();
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getBackupFiles() {
    const files = this.backupService.getBackupFiles();
    return { files };
  }

  @Post('restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async restoreBackup(@Body('backupFile') backupFile: string, @Res() res: Response) {
    if (!backupFile) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Backup file path is required' });
    }

    try {
      const result = await this.backupService.restoreDatabase(backupFile);
      return res.status(HttpStatus.OK).json({ message: result });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Delete('/delete/:fileName')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteBackup(@Param('fileName') fileName: string) {
    return this.backupService.deleteBackupFile(fileName);
  }
}
