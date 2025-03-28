import { Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackupService {
  private backupDir = process.env.BACKUP_PATH || 'src/filebackup';
  // ✅ Hàm sao lưu dữ liệu (Backup)
  backupDatabase(): Promise<string> {
    return new Promise((resolve, reject) => {
      const backupDir = process.env.BACKUP_PATH;
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const backupFile = `${backupDir}/backup_${timestamp}.sql`;

      // 🔥 Xóa tất cả file cũ trước khi backup
      fs.readdir(backupDir, (err, files) => {
        if (err) {
          console.error(`Failed to read backup directory: ${err.message}`);
          reject(`Failed to read backup directory: ${err.message}`);
          return;
        }

        files.forEach(file => {
          fs.unlink(path.join(backupDir, file), unlinkErr => {
            if (unlinkErr) console.error(`Failed to delete old backup: ${unlinkErr.message}`);
          });
        });

        // 🛠️ Tiến hành backup sau khi xóa xong
        const backupCommand = `
          PGPASSWORD=${process.env.DB_PASSWORD} pg_dump -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_NAME} -F c -f ${backupFile}
        `;

        child_process.exec(backupCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Backup failed: ${stderr || error.message}`);
            reject(`Backup failed: ${stderr || error.message}`);
            return;
          }
          console.log(`Backup successful: ${backupFile}`);
          resolve(`Backup successful: ${backupFile}`);
        });
      });
    });
  }


  getBackupFiles(): { fileName: string; createdAt: string }[] {
    try {
      return fs.readdirSync(this.backupDir)
        .filter(file => file.endsWith('.sql'))
        .map(file => {
          const filePath = path.join(this.backupDir, file);
          const stats = fs.statSync(filePath);
          return {
            fileName: file,
            createdAt: stats.birthtime.toISOString(), // 🕒 Thời gian tạo file
          };
        });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách backup:', error);
      return [];
    }
  }
  // ✅ Hàm khôi phục dữ liệu (Restore)
  restoreDatabase(backupFile: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const restoreCommand = `
        PGPASSWORD=${process.env.DB_PASSWORD} pg_restore -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_NAME} --clean --if-exists ${backupFile}
      `;

      child_process.exec(restoreCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Restore failed: ${stderr || error.message}`);
          reject(`Restore failed: ${stderr || error.message}`);
          return;
        }
        console.log(`Restore successful: ${stdout}`);
        resolve(`Restore successful: ${stdout}`);
      });
    });
  }

  // ✅ Hàm xoá file backup theo tên
  deleteBackupFile(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.backupDir, fileName);

      if (!fs.existsSync(filePath)) {
        reject(`File not found: ${fileName}`);
        return;
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err.message}`);
          reject(`Failed to delete file: ${err.message}`);
          return;
        }
        console.log(`File deleted successfully: ${fileName}`);
        resolve(`File deleted successfully: ${fileName}`);
      });
    });
  }



}
