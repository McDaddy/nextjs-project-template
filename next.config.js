const ESLintPlugin = require('eslint-webpack-plugin');
const withAntdLess = require('next-plugin-antd-less');
const path = require('path');

module.exports = () => {
  const nextConfig = withAntdLess({
    modifyVars: { '@primary-color': '#6a549e' },
    lessVarsFilePathAppendToEndOfContent: false,
    images: {
      disableStaticImages: true,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'src', 'styles')],
    },
    webpack: (config) => {
      // Important: return the modified config
      config.plugins.push(new ESLintPlugin({ extensions: ['ts', 'tsx'], failOnError: false }));
      return config;
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      OPENAPI_ADDR: process.env.OPENAPI_ADDR, // Pass through env variables
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/demo', // Matched parameters can be used in the destination
          permanent: false,
        },
      ];
    },
  });

  return nextConfig;
};
