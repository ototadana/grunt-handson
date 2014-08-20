JavaScript文法のおさらい
========================

目次
----
> Gruntfile.js を書くために必要な JavaScript 文法のおさらい

*   [A. 文字列・数値・論理値](#a-)
*   [B. 配列](#b-)
*   [C. オブジェクト](#c-)
*   [D. 関数](#d-)
*   [E. module.exports について](#e-module-exports-)

A. 文字列・数値・論理値
-----------------------
は、以下のように表記する

*   文字列  
    `'hello'` または `"hello"`

*   数値  
    `1` とか `2` とか

*   論理値  
    `true` または `false`


B. 配列
-------
*   配列の表し方  
    **[値1, 値2, ...]**

*   定義

    ```javascript
    var array = ['hello', 'bye'];
    ```

*   アクセス

    ```javascript
    console.log(array[0]);
    console.log(array[1]);
    ```

C. オブジェクト
---------------
*   オブジェクトの表し方  
    **{名前1 : 値1, 名前2 : 値2, ...}**

*   定義

    ```javascript
    var obj = {
        name1: 'value1',     // 文字列
        name2: 2,            // 数値
        name3: false,        // bool
        name4: ['e1', 'e2'], // 配列
        name5: {             // オブジェクト
            name6: 'aaa',
            name7: 123
        },
        name7: function () { // ファンクション
           console.log('hello');
        }
    };
    ```

*   アクセス

    ```javascript
    console.log(obj.name1);
    ```


D. 関数
-------
> 書けそうな所にはどこでも書けてしまうのが JavaScript の関数の特徴

1.  見慣れた書き方
2.  関数を変数に代入
3.  無名関数を変数に代入
4.  関数を別の関数の引数に
5.  オブジェクトの中に関数を

### 1. 見慣れた書き方
*   定義

    ```javascript
    function hello(name) {
      console.log('Hello, ' + name);
    }
    ```

*   実行

    ```javascript
    hello('world');
    ```

### 2. 関数を変数に代入
*   関数も変数に代入できる

    ```javascript
    var f1 = hello;
    ```

*   代入した変数名で実行

    ```javascript
    f1('world');
    ```

### 3. 無名関数を変数に代入
*   名前のない関数を変数に代入

    ```javascript
    var bye = function(name) {
      console.log('Bye, ' + name);
    };
    ```

*   実行

    ```javascript
    bye('world');
    ```

### 4. 関数を別の関数の引数に
*   定義

    ```javascript
    function greet(name, g1, g2) {
      g1(name);
      g2(name);
    }
    ```

*   実行

    ```javascript
    greet('world', hello, bye);
    greet('world', bye, bye);
    ```

### 5. オブジェクトの中に関数を
*   定義

    ```javascript
    var greetings = {
        hello: function(name) {
           console.log('Hello, ' + name);
        },
        bye: function(name) {
           console.log('Bye, ' + name);
        }
    };
    ```

*   実行

    ```javascript
    greetings.hello('world');
    greetings.bye('world');
    ```



E. module.exports について
--------------------------
1.  module.exports の意味
2.  動作を確認してみる - Gruntfile.js
2.  動作を確認してみる - node で実行

### 1.  module.exports の意味
*   [Node.js](http://nodejs.org/) のモジュール間参照の仕組み
*   `module.exports` に代入したオブジェクトや関数は、外部のスクリプトから `require()` 経由で利用できる
*   参考: [Node.jsのmoduleの書き方の基本: 別のファイルのオブジェクトや関数をrequireして使う方法](http://memo.yomukaku.net/entries/jbjiYnP)


### 2.  動作を確認してみる
*   Gruntfile.js の定義

    ```javascript
    module.exports = function(grunt) {
      grunt.registerTask('hello', function(){
        console.log('Hello, world!');
      });
    };
    ```
*   node で以下を実行してみる

    ```javascript
    // Gruntfile.js に定義した関数を gruntfile 変数に代入
    var gruntfile = require('./Gruntfile.js');

    // grunt も module.exports で公開されているため取得できる
    var grunt = require('grunt');
    
    // Gruntfile.js に定義した関数を実行
    gruntfile(grunt);

    // 以下を実行すると hello タスクが実行される
    grunt.task.run('hello');
    grunt.task.start();
    ```
