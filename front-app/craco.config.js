module.exports = function() {
  return {
    eslint: {
      loaderOptions: loaderOptions => {
        return {
          ...loaderOptions,
          baseConfig: {
            ...loaderOptions.baseConfig,
            parserOptions: {
              ecmaVersion: 6,
              sourceType: 'module',
              ecmaFeatures: {
                jsx: true
              }
            }
          }
        };
      }
    },
    babel: {
      plugins: [['@babel/plugin-proposal-optional-chaining', {}]]
    }
  };
};
