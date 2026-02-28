import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public', '../src/resources'],
  typescript: {
    reactDocgen: false
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [
        ...(options.presets ?? []),
      ],
      plugins: [
        ...(options.plugins ?? []),
      ],
    };
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
      ],
    });
    return config;
  }
};
export default config;
