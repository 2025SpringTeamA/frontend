# Node.js の公式イメージ（バージョン18、軽量な Alpine Linux ベース）を使用
FROM node:18-alpine

# コンテナ内の作業ディレクトリを /app に設定
WORKDIR /app

# 依存関係ファイル（package.json と lock ファイル）をコピーして、依存モジュールのインストールだけを先に実行
# キャッシュの有効活用により、変更がない限りこのステップは再実行されない
COPY package.json package-lock.json ./
RUN npm install

# 残りのソースコードをすべてコピー
COPY . .

# Next.js アプリの開発サーバーが使用するポート 3000 を開放
EXPOSE 3000

# Next.js の開発サーバーを起動（ホットリロード有効、開発用）
CMD ["npm", "run", "dev"]
