Grunt ハンズオン (活用編)
=========================

目次
----
*   [A. JSHint を実行する (jshint)](#a-jshint-jshint-)
*   [B. ファイル保存時に自動実行 (watch)](#b-watch-)
*   [C. Webサーバを起動する (connect)](#c-web-connect-)
*   [D. 自動リロード (livereload)](#d-livereload-)
*   [Z. 参考資料](#z-)



A. JSHintを実行する (jshint)
----------------------------
[grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
を利用すると [JSHint](http://www.jshint.com/) 
を使ったコードチェックを行うことができます。

1.  インストール
2.  Gruntfile.js の記述
3.  実行してみる

### 1. インストール

```bash
npm install grunt-contrib-jshint --save-dev
```

### 2.  Gruntfile.js の記述

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
}
```

*   この設定では `Gruntfile.js` と `src`, `test` フォルダの下にある `*.js` 
    ファイルを対象にしてコードチェックを行う
*   jshint でエラーが出るようにするため、わざと最終行にセミコロンを付けていない


### 3. 実行してみる
以下のコマンドを実行する

```bash
grunt jshint
```

*   コンソールにエラーが出力されることを確認する


B. ファイル保存時に自動実行(watch)
----------------------------------
[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
を利用するとファイルの変更をトリガーにしてタスクを起動することができます。

1.  インストール
2.  Gruntfile.js を作る
3.  実行してみる


### 1. インストール
1.  以下のように `grunt-contrib-watch` をインストールする
```bash
npm install grunt-contrib-watch --save-dev
```

2.  この例では、`grunt-contrib-jshint` を使用するため、
    もしまだインストールしていない場合は、インストールする
```bash
npm install grunt-contrib-jshint --save-dev
```



### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      tasks: ['jshint']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
```

*   `files` には変更監視対象のファイルを記述する。
    この設定では、`src`, `test` フォルダの下の `*.js` 
    ファイルの修正を監視する
*   `tasks` には変更時に実行するタスクを指定する。
    この設定では JSHint を実行している。
    複数のタスクを指定することも可能

### 3. 実行してみる
1.  `grunt watch` で起動する

    ```bash
    grunt watch
    ```

2.  `*.js` ファイルを修正して、タスクが自動実行されることを確認する



C. Webサーバを起動する (connect)
--------------------------------
[grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
を利用すると Web サーバを起動することができます。

1.  プラグインをインストールする
2.  Gruntfile.js を作る
3.  実行してみる
4.  サーバ起動時にブラウザ起動させる

### 1. プラグインをインストールする
以下のように `grunt-contrib-connect` をインストールする

```bash
npm install grunt-contrib-connect --save-dev
```

### 2. Gruntfile.js を作る
Gruntfile.js に以下のように記述する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      target1: {
        options: {
          hostname: 'localhost',
          port: 9898,
          base: 'dist',
          keepalive: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
};
```

*   `hostname` でサーバが利用するホスト名を指定する
*   `port` でサーバのポート番号を指定する
*   `base` で html ファイルを格納したフォルダを指定する
*   `keepalive: true` を指定しない場合、Gruntのタスク終了時にサーバも停止する

### 3. 実行してみる
1.  `dist` フォルダに以下のような HTML ファイルを `index.html` という名前で作成する

    ```html
    <html>
      <body>hello</body>
    </html>
    ```

2.  `grunt connect` でWebサーバを起動する

    ```bash
    grunt connect
    ```

3.  ブラウザで <http://localhost:9898> にアクセスする


### 4. サーバ起動時にブラウザ起動させる
以下のように `open: ture` をオプションに指定すると、
サーバ起動時にブラウザも自動起動する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      target1: {
        options: {
          hostname: 'localhost',
          port: 9898,
          base: 'dist',
          keepalive: true,
          open: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
};
```

D. 自動リロード (livereload)
----------------------------
[grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) と
[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
の `livereload` オプションを設定すると、
「HTMLファイルやJavaScriptファイルを修正すると同時にブラウザのリロードを行う」
ということができるようになります。

1.  プラグインのインストール
2.  Gruntfile.js を作る
3.  実行してみる

### 1. プラグインのインストール

```bash
npm install grunt-contrib-connect --save-dev
npm install grunt-contrib-watch --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: 'localhost', port: 9898, base: 'dist', open: true,
          livereload: 35730
        }
      }
    },
    watch: {
      files: ['dist/**/*.html'],
      options: {
        livereload: '<%= connect.server.options.livereload %>'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['connect', 'watch']);
};
```

*   watchを実行すると grunt は終了しなくなるため、connect に keepalive オプション指定は不要

### 3. 実行してみる
1.  `dist` フォルダに以下のような HTML ファイルを `index.html` という名前で作成する

    ```html
    <html>
      <body>hello</body>
    </html>
    ```

2.  `grunt` コマンドを実行する (ブラウザに index.html の内容が表示される）

    ```bash
    grunt
    ```

3.  テキストエディタで index.html ファイルの内容を修正して保存し、
    ブラウザのリロードが自動的に行われることを確認する



Z. 参考資料
-----------
*   [Grunt 日本語リファレンス | js STUDIO](http://js.studio-kingdom.com/grunt/)
*   [Gruntハンズオン (基礎編)](./step-01.html)
*   [Gruntハンズオン (テスト編)](./step-03.html)
