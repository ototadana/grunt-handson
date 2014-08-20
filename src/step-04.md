Gruntハンズオン(おまけ)
=======================

目次
----
*   [A. QUnit でテストを行う](#a-qunit-)
*   [B. QUnit で JUnit レポートを出力する](#b-qunit-junit-)
*   [C. Jasmine + Node でテストを行う](#c-jasmine-node-)


A. QUnit でテストを行う
-----------------------
[grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
を利用すると [QUnit](http://qunitjs.com/) を使ったテストを実行することができます。

1.  インストール
2.  Gruntfile.js の記述
3.  テスト用ファイルを用意する
4.  実行してみる


### 1. インストール

```bash
npm install grunt-contrib-qunit --save-dev
```

### 2.  Gruntfile.js の記述

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      files: ['test/**/*.html']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
};
```

*   この設定では `test` フォルダの下にある `*.html` ファイルを対象としてテストを行う


### 3. テスト用ファイルを用意する
`test` フォルダを作成し、以下のファイルを追加する。
*   tests.html

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.14.0.css">
    </head>
    <body>
      <div id="qunit"></div>
      <script src="http://code.jquery.com/qunit/qunit-1.14.0.js"></script>
      <script src="tests.js"></script>
    </body>
    </html>
    ```

*   tests.js

    ```javascript
    QUnit.test( "hello test", function( assert ) {
      assert.ok( 1 == "1", "Passed!" );
    });
    ```

### 4. 実行してみる
```bash
grunt qunit
```

*   テスト結果はコンソール上に出力される



B. QUnitでJUnitレポートを出力する
---------------------------------
[grunt-qunit-junit](https://github.com/sbrandwoo/grunt-qunit-junit)を利用すると、
[grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)のテストの際に
JUnit形式XMLファイルにテスト結果レポートを出力できます。

1.  インストール
2.  Gruntfile.js の記述
3.  テスト用ファイルを用意する
4.  実行してみる


### 1. インストール
`grunt-contrib-qunit` と `grunt-qunit-junit` をインストールする

```bash
npm install grunt-contrib-qunit --save-dev
npm install grunt-qunit-junit --save-dev
```

### 2.  Gruntfile.js の記述

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      files: ['test/**/*.html']
    },
    qunit_junit: {
      options: {
        dest: 'testresult'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-qunit-junit');

  grunt.registerTask('test', ['qunit_junit', 'qunit']);
};
```

*   この設定では `test` フォルダの下にある `*.html` ファイルを対象としてテストを行う
*   この設定では `testresult` フォルダにテスト結果を出力する
*   qunit_junit を利用する場合、(1) qunit_junit, (2) qunitの順番にタスク実行する必要があるため、
    この設定では grunt.registerTask で `test` タスクを定義している


### 3. テスト用ファイルを用意する
`test` フォルダを作成し、以下のファイルを追加する。
*   tests.html

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.14.0.css">
    </head>
    <body>
      <div id="qunit"></div>
      <script src="http://code.jquery.com/qunit/qunit-1.14.0.js"></script>
      <script src="tests.js"></script>
    </body>
    </html>
    ```

*   tests.js

    ```javascript
    QUnit.test( "hello test", function( assert ) {
      assert.ok( 1 == "1", "Passed!" );
    });
    ```

### 4. 実行してみる
```bash
grunt test
```

*   `testresult` フォルダに XML ファイルが出力される





C. Jasmine + Node でテストを行う
---------------------------------
[grunt-jasmine-node](https://github.com/jasmine-contrib/grunt-jasmine-node) を利用すると、
[Jasmine フレームワーク](http://jasmine.github.io/)を使って書かれたテストを
[Node.js](http://nodejs.org/) 上で実行することができます。

1.  インストール
2.  Gruntfile.js の記述
3.  テスト用ファイルを用意する
4.  実行してみる

### 1. インストール

```bash
npm install grunt-jasmine-node --save-dev
```

### 2.  Gruntfile.js の記述

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      files: ['test/**/*.html']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
};
```
