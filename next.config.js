const ESLintPlugin = require('eslint-webpack-plugin');
const withAntdLess = require('next-plugin-antd-less');
const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
  const { parsed: envFileConfig } = dotenv.config({ path: path.resolve(__dirname, '.env') });

  const nextConfig = withAntdLess({
    modifyVars: { '@primary-color': '#6a549e' },
    lessVarsFilePathAppendToEndOfContent: false,
    images: {
      disableStaticImages: true,
    },
    webpack: (config) => {
      // Important: return the modified config
      config.plugins.push(new ESLintPlugin({ extensions: ['ts', 'tsx'], failOnError: false }));
      return config;
    },
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: `${envFileConfig.BACKEND_URL}/api/:path*`,
        },
      ];
    },
  });

  return nextConfig;
};
