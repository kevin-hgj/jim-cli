module.exports = {
    root: true,
    "parserOptions": {
        "ecmaVersion": 8
    },
    "parser": "babel-eslint",
    // "extends": ["airbnb-base"],
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    rules: {
        'generator-star-spacing': 0,
        'no-new': 0,
        'space-before-function-paren': 0,
        'comma-dangle': 0,
        'semi': [2, 'never'],
        'indent': ['error', 2, { 'SwitchCase': 1 }],
        "no-var": 2,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        "prefer-const": [2, {
          "destructuring": "any",
          "ignoreReadBeforeAssign": false
        }],
        "eqeqeq": 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    globals: {

    }
};