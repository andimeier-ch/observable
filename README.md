## Use Jest for testing
* `npm install --save-dev jest`
* for IDE support in PHPStorm go to `Settings -> Languages and Frameworks -> JavaScript -> Libraries`
  and enable `@types/jest`
* to use ES6 module imports:
    * `npm install @babel/plugin-transform-modules-commonjs`
    * create the file `.babelrc` with the following content:
```json
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
```
