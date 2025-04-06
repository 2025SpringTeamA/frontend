# Dockerfile
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# 依存ファイルを先にコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# 残りのファイルをコピー
COPY . .

# Next.js のデフォルトポートを開放
EXPOSE 3000

# devサーバー起動（ホットリロード対応）
CMD ["npm", "run", "dev"]

