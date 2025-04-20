import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  // webpackFinal: async (config) => {
  //   if (config.resolve) {
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       'next/link': path.resolve(__dirname, '../mocks/next/link.tsx'),
  //     };
  //   }
  //   return config;
  // },

  // "staticDirs": [
  //   "..\\public"
  // ]
}
export default config
