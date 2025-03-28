# Chọn base image cho Node.js
FROM node:20

# Cài đặt PostgreSQL client để sử dụng pg_dump
RUN apt-get update && apt-get install -y postgresql-client

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép các file package.json và package-lock.json vào container
COPY package*.json ./

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Biên dịch ứng dụng
RUN npm run build

# Cài đặt Nodemon toàn cục
RUN npm install --global nodemon

# Mở port 8000
EXPOSE 8000

# Chạy ứng dụng bằng Nodemon
CMD ["nodemon", "--config", "nodemon.json"]
