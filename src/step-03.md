Gruntハンズオン(テスト編)
===========================

目次
----
*   [A. QUnit + Chromeでテストを行う](#a-qunit-chrome-)
*   [B. QUnit + PhantomJS でテストを行う](#b-qunit-phantomjs-)
*   [C. Jasmine + Chrome でテストを行う](#c-jasmine-chrome-)
*   [D. Jasmine + PhantomJS でテストを行う](#d-jasmine-phantomjs-)
*   [E. Mocha でテストを行う](#e-mocha-)
*   [F. Mocha で JUnit レポートを出力する](#f-mocha-junit-)
*   [G. Mocha でカバレッジレポートを出力する](#g-mocha-)
*   [H. WebdriverIO で E2E テストを行う](#h-webdriverio-e2e-)
*   [Z. 参考資料](#z-)




A. QUnit+Chromeでテストを行う
-----------------------------
[テストランナー Karma](http://karma-runner.github.io/) を使い、
[QUnit フレームワーク](http://qunitjs.com/)を使って書かれたテストを
Chrome ブラウザ上で実行します。

1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する
5.  カバレッジレポートを取得する


### 1. インストール

```bash
npm install karma-qunit --save-dev
npm install karma-chrome-launcher --save-dev
npm install karma-coverage --save-dev
npm install grunt-karma --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['qunit'],
          browsers: ['Chrome'],
          files: ['test/**/*.js', 'src/**/*.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

### 3.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    function hello(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    }
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    QUnit.test( "hello test", function( assert ) {
      assert.equal(hello("Shoichi"), "Hello, Shoichi");
    });
    ```

### 4. 実行する
以下のコマンドを実行すると Chrome ブラウザが起動し、
テストが実行される（テスト結果はコンソール上に表示される）

```bash
grunt karma
```

ファイルを変更し保存するたびに、テスト実行が行われる。


### 5. カバレッジレポートを取得する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['qunit'],
          browsers: ['Chrome'],
          files: ['test/**/*.js', 'src/**/*.js'],
          reporters: ['progress', 'coverage'],
          preprocessors: {
            'src/**/*.js': ['coverage']
          },
          coverageReporter: {
            type : 'html',
            dir : 'coverage/'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   Gruntfile.js を上記のように変更すると `coverage` フォルダに
    カバレッジレポートが作成される



B. QUnit + PhantomJS でテストを行う
-------------------------------------
[テストランナー Karma](http://karma-runner.github.io/) を使い、
[QUnit フレームワーク](http://qunitjs.com/)を使って書かれたテストを
[PhantomJS ブラウザ](http://phantomjs.org/)上で実行します。

このケースでは CI環境 (Jenkins) 上での実行を想定して、
テスト結果を JUnit 形式の XML ファイルで出力してみます。

1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する
5.  カバレッジレポートを取得する

### 1. インストール

```bash
npm install karma-qunit --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-junit-reporter --save-dev
npm install karma-coverage --save-dev
npm install grunt-karma --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['qunit'],
          browsers: ['PhantomJS'],
          singleRun: true,
          reporters: ['progress', 'junit'],
          junitReporter: {
            outputFile: 'test-results.xml'
          },
          files: ['test/**/*.js', 'src/**/*.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   `test-results.xml` にテスト結果が出力される設定


### 3.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    function hello(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    }
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    QUnit.test( "hello test", function( assert ) {
      assert.equal(hello("Shoichi"), "Hello, Shoichi");
    });
    ```

### 4. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt karma
```

*   テスト結果は `test-results.xml` に出力される


### 5. カバレッジレポートを取得する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['qunit'], browsers: ['PhantomJS'], singleRun: true,
          reporters: ['progress',  'junit', 'coverage'], 
          files: ['test/**/*.js', 'src/**/*.js'],
          junitReporter: {
            outputFile: 'test-results.xml'
          },
          preprocessors: {
            'src/**/*.js': ['coverage']
          },
          coverageReporter: {
            type : 'html', dir : 'coverage/'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   上記のように変更すると `coverage` フォルダにカバレッジレポートが作成される



C. Jasmine+Chromeでテストを行う
-------------------------------
[テストランナー Karma](http://karma-runner.github.io/) を使い、
[Jasmine フレームワーク](http://jasmine.github.io/)を使って書かれたテストを
Chrome ブラウザ上で実行します。

1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する
5.  カバレッジレポートを取得する


### 1. インストール

```bash
npm install karma-jasmine --save-dev
npm install karma-chrome-launcher --save-dev
npm install karma-coverage --save-dev
npm install grunt-karma --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          browsers: ['Chrome'],
          files: ['test/**/*.js', 'src/**/*.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

### 3.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    function hello(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    }
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    describe('hello', function(){
      it('returns "Hello, [name]"', function(){
        expect(hello('Shoichi')).toBe('Hello, Shoichi')
      });
    });
    ```

### 4. 実行する
以下のコマンドを実行すると Chrome ブラウザが起動し、
テストが実行される（テスト結果はコンソール上に表示される）

```bash
grunt karma
```

ファイルを変更し保存するたびに、テスト実行が行われる。


### 5. カバレッジレポートを取得する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          browsers: ['Chrome'],
          files: ['test/**/*.js', 'src/**/*.js'],
          reporters: ['progress', 'coverage'],
          preprocessors: {
            'src/**/*.js': ['coverage']
          },
          coverageReporter: {
            type : 'html',
            dir : 'coverage/'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   Gruntfile.js を上記のように変更すると `coverage` フォルダに
    カバレッジレポートが作成される





D. Jasmine + PhantomJS でテストを行う
-------------------------------------
[テストランナー Karma](http://karma-runner.github.io/) を使い、
[Jasmine フレームワーク](http://jasmine.github.io/)を使って書かれたテストを
[PhantomJS ブラウザ](http://phantomjs.org/)上で実行します。

このケースでは CI環境 (Jenkins) 上での実行を想定して、
テスト結果を JUnit 形式の XML ファイルで出力してみます。

1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する
5.  カバレッジレポートを取得する


### 1. インストール

```bash
npm install karma-jasmine --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-junit-reporter --save-dev
npm install karma-coverage --save-dev
npm install grunt-karma --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          browsers: ['PhantomJS'],
          singleRun: true,
          reporters: ['progress', 'junit'],
          junitReporter: {
            outputFile: 'test-results.xml'
          },
          files: ['test/**/*.js', 'src/**/*.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   `test-results.xml` にテスト結果が出力される設定


### 3.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    function hello(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    }
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    describe('hello', function(){
      it('returns "Hello, [name]"', function(){
        expect(hello('Shoichi')).toBe('Hello, Shoichi')
      });
    });
    ```

### 4. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt karma
```

*   テスト結果は `test-results.xml` に出力される


### 5. カバレッジレポートを取得する

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'], browsers: ['PhantomJS'], singleRun: true,
          reporters: ['progress',  'junit', 'coverage'], 
          files: ['test/**/*.js', 'src/**/*.js'],
          junitReporter: {
            outputFile: 'test-results.xml'
          },
          preprocessors: {
            'src/**/*.js': ['coverage']
          },
          coverageReporter: {
            type : 'html', dir : 'coverage/'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
```

*   上記のように変更すると `coverage` フォルダにカバレッジレポートが作成される



E. Mocha でテストを行う
-----------------------
[grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test) を利用すると 
[Mocha フレームワーク](http://visionmedia.github.io/mocha/) を使って書かれたテストを
[Node.js](http://nodejs.org/) 上で実行することができます。

1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する


### 1. インストール

```bash
npm install grunt-mocha-test --save-dev
```

### 2. Gruntfile.js を作る

```bash
module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha-test');
};
```

### 3.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    module.exports = function(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    };
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    var hello = require('../src/hello.js');
    var assert = require('assert');
    describe('hello', function(){
      it('returns "Hello, [name]"', function(){
        assert.equal(hello('Shoichi'), 'Hello, Shoichi');
      });
    });
    ```

### 4. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt mochaTest
```



F. MochaでJUnitレポートを出力する
---------------------------------
1.  インストール
2.  Gruntfile.js を作る
3.  テスト対象ファイルを用意する
4.  実行する


### 1. インストール

```
npm install grunt-mocha-test --save-dev
npm install grunt-env --save-dev
npm install xunit-file --save-dev
npm install mocha --save-dev
```

### 2. Gruntfile.js を作る

```bash
module.exports = function(grunt) {
  grunt.initConfig({
    env: {
      test: {
        XUNIT_FILE: 'test-results.xml'
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'xunit-file',
          require: 'xunit-file'
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', ['env', 'mochaTest']);
};
```

*   `test-results.xml` にテスト結果が出力される設定


### 3. テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    module.exports = function(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    };
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    var hello = require('../src/hello.js');
    var assert = require('assert');
    describe('hello', function(){
      it('returns "Hello, [name]"', function(){
        assert.equal(hello('Shoichi'), 'Hello, Shoichi');
      });
    });
    ```

### 4. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt
```

*   テスト結果は `test-results.xml` に出力される


G. Mochaでカバレッジレポートを出力する
--------------------------------------
1.  インストール
2.  Gruntfile.js を作る
3.  converage/blanket.js を作る
4.  テスト対象ファイルを用意する
5.  実行する


### 1. インストール

```
npm install grunt-mocha-test --save-dev
npm install blanket --save-dev
```

### 2. Gruntfile.js を作る

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha-test');
};
```

*   `coverage.html` にカバレッジレポートが出力される設定

### 3. converage/blanket.js を作る
`converage` フォルダを作成し、その下に以下のような内容で `blanket.js` を作成する

```javascript
require('blanket')({
  pattern: require('path').join(__dirname, '..', 'src')
});
```

*   `src` フォルダの下にあるファイルをカバレッジ取得対象とする設定

### 4.  テスト対象ファイルを用意する
1.  `src` フォルダを作成し、その中に `hello.js` という名前で以下のようなファイルを作る

    ```javascript
    module.exports = function(name) {
      if(name) {
        return "Hello, " + name;
      } else {
        return "Bye";
      }
    };
    ```

2.  `test` フォルダを作成し、その中に `helloTest.js` という名前で以下のようなファイルを作る

    ```javascript
    var hello = require('../src/hello.js');
    var assert = require('assert');
    describe('hello', function(){
      it('returns "Hello, [name]"', function(){
        assert.equal(hello('Shoichi'), 'Hello, Shoichi');
      });
    });
    ```

### 5. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt mochaTest
```

*   `coverage.html` にカバレッジレポートが出力される



H. WebdriverIOでE2Eテストを行う
-------------------------------
[grunt-webdriver](https://github.com/webdriverio/grunt-webdriver) を利用すると、
[Mocha](http://visionmedia.github.io/mocha/) と 
[WebdriverIO](http://webdriver.io/) を用いたテストを行うことができます。

1.  インストール
2.  Gruntfile.js の記述
3.  テスト対象ファイルを用意する
4.  実行する


### 1. インストール
`grunt-webdriver` をインストールする

```bash
npm install grunt-webdriver --save-dev
```

### 2.  Gruntfile.js の記述

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    webdriver: {
      options: {
        desiredCapabilities: {
          browserName: 'chrome'
        },
        reporter: 'xunit',
        output: 'test-results.xml'
      },
      test: {
        tests: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-webdriver');
};
```

*   この設定では Chrome ブラウザを起動してテストを行う
*   この設定では `test` フォルダの下にある `*.js` ファイルを対象としてテストを行う
*   この設定では `test-results.xml` にテスト結果を出力する

### 3. テスト対象ファイルを用意する
`test` フォルダを作成し、その中に `test1.js` という名前で以下のようなファイルを作る

```bash
var assert = require('assert');

describe('grunt-webdriver test', function () {
  it('checks if title contains the search query', function(done) {
    browser
      .url('https://github.com')
      .setValue('form.js-site-search-form input[type="text"]','grunt-webdriver')
      .submitForm('form.js-site-search-form')
      .getTitle(function(err,title) {
          assert(title.indexOf('grunt-webdriver') !== -1);
      })
      .end(done);
  });
});
```

*   [GitHub](https://github.com) にアクセスし、
    'grunt-webdriver' で検索して一覧取得する、
    という動作を行う


### 4. 実行する
以下のコマンドを実行するとテストが実行される

```bash
grunt webdriver
```

*   `test-results.xml` にテスト結果が出力される



Z. 参考資料
-----------
*   [Grunt 日本語リファレンス | js STUDIO](http://js.studio-kingdom.com/grunt/)
*   [Gruntハンズオン (基礎編)](./step-01.html)
*   [Gruntハンズオン (活用編)](./step-02.html)
