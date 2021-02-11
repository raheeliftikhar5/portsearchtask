module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'react/no-unescaped-entities': [0],
    // 'no-template-curly-in-string': [0],
    // 'react/jsx-props-no-spreading': [0],
    // 'import/prefer-default-export': [0],
  },
  ignorePatterns: ['*.test.js', 'serviceWorker.js', '/build/*'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
