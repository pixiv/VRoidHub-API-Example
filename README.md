# VRoid Hub API Example

## 目次

- [概要](#概要)
- [デモ](#デモ)
- [推奨動作環境](#license)
- [セットアップと実行](#セットアップと実行)
  - [開発者登録](#開発者登録)
  - [アプリケーション作成](#アプリケーション作成)
- [VRoid Hub APIについて](#vroid-hub-apiについて)
- [LICENSE](#license)

## 概要

このExampleでは[VRoid Hub API](https://developer.vroid.com/api)を利用して、

- VRoid HubとのOAuth2.0連携（[NextAuth.js](https://github.com/nextauthjs/next-auth)を利用）
- キャラクターモデル一覧の取得
- キャラクターモデルに紐づいたアバターファイル（.vrmファイル）の読み込み
- アバターモデルの表示（[@pixiv/three-vrm](https://github.com/pixiv/three-vrm)を利用）

を行うことができます。

## デモ

mainブランチの最新のコードで動作している<a href="https://main.d3s7y579k91bnt.amplifyapp.com/" target="_blank" rel="noopener noreferrer">デモ</a>を公開しています。

## 推奨動作環境

- Node.js: v18.16.0
- yarn: 1.22.19
- 推奨ブラウザ: Chrome

## セットアップと実行

### 開発者登録

1. VRoid Hubの[開発者登録ページ](https://hub.vroid.com/developer/registration)にアクセスします。
2. VRoid Hubにログインした上で、必要事項を入力し、開発者登録を行ってください。
3. VRoid HubとOAuth連携するアプリケーションの情報をVRoid Hubに登録します。次項に進んでください。

### アプリケーション作成

1. VRoid Hubの[連携アプリケーション管理ページ](https://hub.vroid.com/oauth/applications)にアクセスします。<br/>※連携アプリケーション管理ページの言語設定はVRoid Hubの言語設定に依存します。
2. 「新しいアプリケーション」ボタンを押下し、アプリケーション作成画面に遷移します。
3. 必要事項を入力し、「登録」ボタンを押下するとアプリケーションが作成されます。<br />※ローカルでこのリポジトリを動かす場合は、スコープに `default` 、リダイレクトURIに `http://localhost:3000/api/auth/callback/vroid` を設定してください。
4. 作成されたアプリケーションは[連携アプリケーション管理ページ](https://hub.vroid.com/oauth/applications)に一覧表示されます。
5. 作成したアプリケーションのページに遷移すると、アプリケーションID（ClientID）とシークレット（ClientSecret）が確認できます。これらの認証情報が記述されたJSONファイルを「Credentialファイル作成」よりダウンロードすることができます。重要な情報なので安全に保管してください。

### リポジトリのセットアップ

1. このリポジトリをクローンするかダウンロードしてください。

```
git clone git@github.com:pixiv/VRoidHub-API-Example.git
```

2. `.env` ファイルに下記の環境変数を設定してください

```
CLIENT_ID= アプリケーションページから閲覧できるアプリケーションIDの値を入力してください
CLIENT_SECRET= アプリケーションページから閲覧できるシークレットの値を入力してください
NEXT_PUBLIC_NEXTAUTH_SECRET= openssl rand -base64 32 コマンドで生成したシークレット値を入力してください
NEXTAUTH_URL= ExampleをホストしているURLのroot URLを入力してください
```

3. 必要なパッケージをインストールしてください。

```
yarn install
```

4. パッケージのインストール完了後、下記コマンドで開発用webサーバーが起動します

```
yarn dev
```

5. 実行後、以下のURLにアクセスして動作を確認してください
   http://localhost:3000

---

## VRoid Hub APIについて

VRoid Hubでは外部アプリケーションがVRoid Hubにあるアバターファイルを利用するためのAPIを公開しています。

APIの利用にはVRoid Hubでの[開発者登録](#開発者登録)と[アプリケーションの作成](#アプリケーション作成)、OAuth2.0による認可が必要です。

VRoid Hub APIを利用すると、VRoid Hubに登録されたキャラクターを自分のアプリケーションで利用できるようになります。

## LICENSE

Apache2.0ライセンスに準拠しています。詳細は[LICENSE](https://github.com/pixiv/VRoidHub-API-Example/blob/master/LICENSE)を参照してください。
