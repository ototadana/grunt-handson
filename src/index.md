Grunt ハンズオン
================

1. Grunt とは
-------------
JavaScript 用のビルドツールです。

JavaScript を用いた開発における様々な作業を自動化することにより開発者をサポートします。

##### 公式サイト
*   <http://gruntjs.com/>  


2. Grunt の特徴
---------------
*   Gruntfile.js という設定ファイルにタスクの定義を行う
*   設定ファイル (Gruntfile.js) は JavaScript で記述する
*   すぐに使える便利なプラグインが豊富に用意されている


3. どんなプラグインがある?
--------------------------
*   JavaScript の minify (圧縮)
*   複数のJavaScriptファイルの結合
*   JavaScript の構文チェック
*   CoffeeScript や TypeScript のコンパイル (JavaScript変換)
*   自動テスト
*   Webサーバになる
*   その他にもたくさん...


4. セットアップ
---------------
1.  [node.js](http://nodejs.org/) をインストールする
2.  社内LAN等プロキシサーバを使っている場合は、コマンドラインから以下のように設定を行う

    ```bash
    npm config set proxy http://ユーザー名:パスワード@サーバ名:ポート番号/
    npm config set registry http://registry.npmjs.org/
    ```

    *   ユーザー名の中に `@` が含まれる場合は `%40` と書く (例：`user@example.com` ならば `user%40example.com`)。
    *   参考: [Windows7,proxy環境下でのnpm config設定](http://qiita.com/tenten0213/items/7ca15ce8b54acc3b5719)
3.  Grunt のコマンドラインインターフェース(CLI) をインストールする

    ```bash
    npm install -g grunt-cli
    ```


5. 使ってみよう
---------------
*   [Gruntハンズオン (基礎編)](./step-01.html)
*   [Gruntハンズオン (活用編)](./step-02.html)
*   [Gruntハンズオン (テスト編)](./step-03.html)
