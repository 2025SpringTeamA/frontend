## 2025SpringTeamA Frontend

### Purpose ｜目的

チーム開発の土台となるフロントエンド基盤を構築することを目的としています。Next.js を中心に据え、Docker による環境整備や、ESLint によるコード品質の保持を通じて、再現性・効率・保守性の高い開発プロセスを実現します。

### Background ｜背景

チーム開発を円滑に進めるためには、環境の統一やコーディングスタイルの統一が欠かせません。このプロジェクトでは以下のような背景から構成を整えました：

- 再現性のある環境構築のために、Docker を導入
- チームでの統一的なコーディングスタイルを実現するために、ESLint と Prettier を設定
- 開発効率を高めるために、Makefile を用意
- 拡張性のある設計を可能にするために、TypeScript + Next.js を採用

### Structure ｜ディレクトリ構成

```
frontend/
├── docker-compose.yml       # Docker設定（開発環境）
├── Dockerfile               # アプリ用Dockerイメージ定義
├── eslint.config.mjs        # ESLint 設定
├── Makefile                 # よく使うコマンドの簡略化
├── next.config.ts           # Next.js 設定
├── package.json             # 依存ライブラリ定義
├── postcss.config.mjs       # Tailwind CSS等のPostCSS設定
├── public/                  # 公開アセット（画像等）
│   ├── *.svg
├── README.md                # プロジェクト概要（このファイル）
├── src/
│   └── app/
│       ├── favicon.ico      # ブラウザアイコン
│       ├── globals.css      # 全体スタイル
│       ├── layout.tsx       # レイアウトコンポーネント
│       └── page.tsx         # トップページ
└── tsconfig.json            # TypeScript 設定
```

### How to Start ｜起動方法

#### 前提条件

- Docker / Docker Compose のインストール済み
- make コマンドが使えること（Linux / macOS）

#### 起動手順

```
cd frontend
make up       # コンテナを立ち上げて開発環境を起動
```

起動後、ブラウザで http://localhost:3000 にアクセス

#### よく使うコマンド

```
make build    # アプリケーションのビルド
make lint     # コードチェック
make down     # コンテナ停止
```

### Tech Stack ｜使用技術

- Next.js – React ベースのフレームワーク
- TypeScript – 型安全な JavaScript
- Docker / Docker Compose – 仮想化された開発環境
- ESLint / Prettier – コード品質管理ツール
- PostCSS – CSS 拡張処理
- Tailwind CSS
- HeadlessUI

### Highlights ｜工夫ポイント

- Makefile によりコマンド操作の簡略化
- ESLint でコードスタイルをチェック＆統一
- Docker によって、全員が同じ環境で開発可能
- public/ に SVG アイコンを集約し、UI に統一感を持たせやすい構成に

### Contribution ｜コントリビューション

このプロジェクトはオープンです。改善提案・バグ報告など、どんな貢献も大歓迎！

#### プルリク手順

1. feature/xxx ブランチを作成
2. 修正をコミット
3. main ブランチに向けてプルリクエストを作成

### Memo ｜補足

- 対象メンバー：Team A 全メンバー
- 期間：2025 年 春
- 目的：実践的なチーム開発とフロントエンド技術の習得
- 備考：本プロジェクトは今後バックエンド・デプロイとも連携予定
