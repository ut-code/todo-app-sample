# Todo App Sample

Deploy URL: <https://todo-app-sample.fly.dev/>

## 重要なファイル

- `server.mjs`: サーバーの挙動が定義されています
- `public`: サーバーがクライアントに渡すファイルが書かれています

## 今回は重要ではないファイル

- `Dockerfile`: アプリケーションのデプロイ方法を決めます
- `fly.toml`: デプロイ先 (Fly.io) の設定ファイルです
- `.github/*`: GitHub のワークフロー (Extra Learn CI/CD の章を参照) の定義ファイルです
- `.gitignore`, `.dockerignore`: Git や Docker に無視するファイルを伝えます

## コマンド

- `npm run start`: サーバーをスタートします
