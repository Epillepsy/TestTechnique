module.exports = {
  root: true,

  env: {
    node: true,
    es6: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 'off',
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'ignore'
    }],
    'no-cycle': 'off',
    'no-unused-vars': [
      'error', { args: 'after-used' },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_id',
          '__vue__',
          '_chart',
          '_bodyFontFamily',
          '_bodyFontStyle',
          '_active',
          '_model',
          '_data',
        ],
      },
    ],
    'vue/attributes-order': 1,
    'vue/html-quotes': 1,
    'vue/no-confusing-v-for-v-if': 1,
    'vue/order-in-components': 1,
    'vue/this-in-template': 1,
    'vue/no-use-v-if-with-v-for': 0,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
    'plugin:vue/essential',
  ],
};
