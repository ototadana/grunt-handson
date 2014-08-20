Grunt ハンズオン (基礎編)
=========================

目次
----
*   [A. 基本的な使い方](#a-)
*   [B. プラグインを利用する](#b-)
*   [C. 複数のプラグインを利用する](#c-)
*   [Z. 参考資料](#z-)


A. 基本的な使い方
-----------------
1.  準備
2.  フォルダ構造を確認する
3.  Gruntfile.js を作る
4.  タスクを追加する
5.  複数のタスクを実行する
6.  デフォルトタスクを作る
7.  grunt.initConfig を利用する

### 1. 準備
1.  フォルダをひとつ作成し、そのフォルダに移動する

    ```bash
    mkdir tutorial
    cd tutorial
    ```

2.  `npm init` を実行する

    ```bash
    npm init
    ```

    *   質問には、とりあえず全てエンターで答えればOK
    *   上記のコマンド実行により、`package.json` (JavaScriptライブラリを管理するための設定ファイル) が作成される

3.  以下のコマンドを実行し、Grunt をこのフォルダにインストールする

    ```bash
    npm install grunt --save-dev
    ```

### 2. フォルダ構造を確認する
以下のフォルダとファイルが作成されていることを確認する

```text
tutorial/
    - node_modules/ ... インストールした JavaScript ライブラリが格納される
    - package.json
```


### 3. Gruntfile.js を作る
1.  作成したフォルダに `Gruntfile.js` という名前のファイルを作成し、
    以下のように記述する

    ```javascript
    module.exports = function(grunt) {

      grunt.registerTask('hello', function(){
        console.log('Hello, world!');
      });

    };
    ```

    *   `grunt.registerTask` で実行するタスクを登録できる
    *   第1引数にタスク名、第2引数にタスクの処理内容を書く
    *   参考: [JavaScript文法のおさらい](./javascript-01.html)


2.  `grunt` コマンドでタスクを実行する

    ```bash
    grunt hello
    ```

    *   *Hello, world!* が出力される


### 4. タスクを追加する
1.  `bye` タスクを追加する
    ```javascript
    module.exports = function(grunt) {
      grunt.registerTask('hello', function(){
        console.log('Hello, world!');
      });

      grunt.registerTask('bye', function(){
        console.log('Bye, world!');
      });

    };
    ```

    *   タスクはいくつでも登録可能

2.  追加したタスクを実行する

    ```bash
    grunt bye
    ```

    *   *Bye, world!* が出力される

### 5. 複数のタスクを実行する
1.  `hellobye` タスクを追加する

    ```javascript
    module.exports = function(grunt) {
      grunt.registerTask('hello', function(){
        console.log('Hello, world!');
      });
      grunt.registerTask('bye', function(){
        console.log('Bye, world!');
      });

      grunt.registerTask('hellobye', ['hello', 'bye']);

    };
    ```

    *   `grunt.registerTask` の第2引数にタスク名の配列を指定することで
        **複数タスクを一括実行するタスク**を作成できる

2.  追加したタスクを実行する

    ```bash
    grunt hellobye
    ```

    *   *Hello, world!* と *Bye, world!* が出力される

### 6. デフォルトタスクを作る
1.  `default` タスクを追加する

    ```javascript
    module.exports = function(grunt) {
      grunt.registerTask('hello', function(){
        console.log('Hello, world!');
      });
      grunt.registerTask('bye', function(){
        console.log('Bye, world!');
      });
      grunt.registerTask('hellobye', ['hello', 'bye']);

      grunt.registerTask('default', ['hello']);
    };
    ```

2.  デフォルトタスクを実行する

    ```bash
    grunt
    ```

    *   *Hello, world!* が出力される
    *   引数なしで `grunt` コマンドを実行した場合、
        `default` という名前で登録されたタスクが実行される


### 7. grunt.initConfig を利用する
1.  `grunt.initConfig` に `message` を定義して、
    タスクの中で利用する

    ```javascript
    module.exports = function(grunt) {
      grunt.initConfig({
        message: 'Hello, hello, world!'
      });
      grunt.registerTask('hello', function(){
        console.log(grunt.config('message'));
      });
    };
    ```

    *   `grunt.initConfig` には Gruntの設定をオブジェクトとして記述する


2.  タスクを実行する

    ```bash
    grunt hello
    ```

    *   *Hello, hello, world!* が出力される


B. プラグインを利用する
-----------------------
[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
を例にして、プラグインを利用してみます。  

>   (*) grunt-contrib-concat は複数のファイルをひとつに結合するためのプラグインです。

1.  準備
2.  プラグインをインストールする
3.  Gruntfile.js を作る
4.  実行してみる
5.  オプションを指定する
6.  複数の実行ターゲットを作る
7.  複数のターゲットを実行する

### 1. 準備
1.  フォルダをひとつ作成し、そのフォルダに移動する

    ```bash
    mkdir plugins
    cd plugins
    ```

2.  `npm init` を実行する

    ```bash
    npm init
    ```

    *   質問には、とりあえず全てエンターで答えればOK
    *   上記のコマンド実行により、`package.json` (JavaScriptライブラリを管理するための設定ファイル) が作成される

3.  以下のコマンドを実行し、Grunt をこのフォルダにインストールする

    ```bash
    npm install grunt --save-dev
    ```

### 2. プラグインをインストールする
以下のように
[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
をインストールする

```bash
npm install grunt-contrib-concat --save-dev
```


### 3. Gruntfile.js を作る
作成したフォルダに `Gruntfile.js` という名前のファイルを作成し、
以下のように記述する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      target1: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/built.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};
```

*   `grunt.loadNpmTasks` でプラグインのタスク（concat）を登録する
*   `grunt.initConfig` にプラグインタスク名（concat）と同じキーを追加し、
    その値としてプラグイン設定を記述する

### 4. 実行してみる
1.  今回の定義では `src` フォルダにある `a.js`, `b.js` という二つのファイルを結合して
    `dist` フォルダに `built.js` というファイルを作成するので、実行の前に `src` フォルダを作成し、
    その中に `a.js`, `b.js` という二つのファイルを作成する（内容は何でもよい）

    ```text
    src/
        - a.js
        - b.js
    ```

2.  grunt コマンドでタスクを実行する

    ```bash
    grunt concat
    ```

3.  `dist` フォルダが作成され、その中に `built.js` というファイルができているはずなので、
    テキストエディタで開き、内容を確認する


### 5.  オプションを指定する
Gruntfile.js の `grunt.initConfig` に以下のように `options` の定義を追加する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        banner: '/*! Generated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      target1: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/built.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};
```

*   `options` にはプラグインのオプションを指定できる
*   `concat` の `banner` オプションには、結合したファイルの先頭に挿入する文字列を指定できる


### 6.  複数の実行ターゲットを作る
Gruntfile.js の `grunt.initConfig` を以下のように記述する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      target1: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/built.js'
      },
      target2: {
        src: ['src/*.txt'],
        dest: 'dist/built.txt'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};
```

*   ひとつのタスクの中には複数の実行ターゲットを指定できる
*   ここでは `concat` の中に `target1` と `target2` を追加した

### 7. 複数のターゲットを実行する
1.  `dist` フォルダのファイルを削除して、以下のコマンドを実行する
    ```bash
    grunt concat:target2
    ```
    *   `build.txt` が作成される
    *   `grunt タスク:ターゲット` とすれば指定したターゲットのみ実行される
2.  `dist` フォルダのファイルを削除して、以下のコマンドを実行する
    ```bash
    grunt concat
    ```
    *   `build.js` と `build.txt` が作成される
    *   `grunt タスク` とした場合、全ターゲットが実行される





C. 複数のプラグインを利用する
-----------------------------
[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
と [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) 
を組み合わせて利用してみます。  

>   (*) grunt-contrib-uglify は [UglifyJS](https://github.com/mishoo/UglifyJS)
>   を使って JavaScript を圧縮するプラグインです。

1.  プラグインをインストールする
2.  Gruntfile.js を作る
3.  実行してみる
4.  registerTask でデフォルトタスクとして実行する


### 1. プラグインをインストールする
以下のように `grunt-contrib-concat` と `grunt-contrib-uglify` をインストールする

```bash
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
```

*   すでに `grunt-contrib-concat` をインストール済みのフォルダ上で実行する場合は、
    `grunt-contrib-uglify` のインストールのみでOK

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      target1: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/built.js'
      }
    },
    uglify: {
      target1: {
        files: {
          'dist/built.min.js': ['<%= concat.target1.dest %>']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
```

*   `grunt.loadNpmTasks` でプラグインのタスク（uglify）を登録する
*   `grunt.initConfig` に `uglify` タスク設定を追加
*   `concat.target1.dest` で定義されている 'dist/built.js' を対象にして
    圧縮を行い、'dist/built.min.js' を作成するという定義になっている

### 3. 実行してみる
1.  以下のようなファイルを作成する
    *   `src/a.js`
    ```javascript
        function f1(param1) {
            console.log(param1);
        }
    ```
    *   `src/b.js`
    ```javascript
        function f2(param1) {
            console.log(param1);
        }
    ```

2.  以下のコマンドを実行する
    ```bash
    grunt concat uglify
    ```

    *   `dist/built.min.js` が作成されていることを確認する。


### 4. デフォルトタスクとして実行する
毎回、`grunt concat uglify` を入力するのは面倒だったり、
concat の実行を忘れたりしがちなので、
通常こういうケースでは、あらかじめ別タスクとして定義します。

1.  Gruntfile.js に以下のように記述する

    ```javascript
    module.exports = function(grunt) {
      ...(省略)...

      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify');

      grunt.registerTask('default', ['concat', 'uglify']);
    };
    ```

    *   この例ではデフォルトタスクとして登録しています

2.  実行する

    ```bash
    grunt
    ```


Z. 参考資料
-----------
*   [Gruntで始めるWeb開発爆速自動化入門」最新記事一覧](http://www.atmarkit.co.jp/ait/kw/grunt_nyumon.html)
*   [タスクの設定 | Grunt 日本語リファレンス | js STUDIO](http://js.studio-kingdom.com/grunt/doc/configuring_tasks)
*   [Gruntfileの見本 | Grunt 日本語リファレンス | js STUDIO](http://js.studio-kingdom.com/grunt/doc/sample_gruntfile)
*   [Gruntハンズオン (活用編)](./step-02.html)
*   [Gruntハンズオン (テスト編)](./step-03.html)
