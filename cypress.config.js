const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    //Base URL when you run npm start
    baseUrl: "http://localhost:8080/"
  },
});
