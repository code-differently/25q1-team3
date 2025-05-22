const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    retries: {
      runMode: 2,
      openMode: 0
    }
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
