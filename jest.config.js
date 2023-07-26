module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^vuetify/components$': '<rootDir>/node_modules/vuetify/lib/components/index.mjs',
    '^vuetify/lib/components$': '<rootDir>/node_modules/vuetify/lib/components/index.mjs',
    '^vuetify/directives$': '<rootDir>/node_modules/vuetify/lib/directives/index.mjs',
  },
  transformIgnorePatterns: ['node_modules/(?!vuetify)'],
  setupFilesAfterEnv: ['./tests/setup.js'],
};
