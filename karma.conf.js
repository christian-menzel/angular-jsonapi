'use strict';

module.exports = function(config) {
  var webdriverConfig = {
    hostname: process.env.SELENIUM_HUB_ADDRESS,
    port: process.env.SELENIUM_HUB_PORT
  };
  config.set({
    hostname: process.env.KARMA_HOST,
    basePath: '',
    frameworks: ['jasmine'],
    wiredep: {
      dependencies: true,
      devDependencies: true
    },
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/index.js',
      'src/services/*.js',
      'test/*.spec.js'
    ],
    exclude: [
    ],
    reporters: ['progress', 'html'],
    htmlReporter: {
      outputFile: 'reports/karma/report.html',

      // Optional
      pageTitle: 'Frontend Unit Tests',
      subPageTitle: 'Dev 2017',
      groupSuites: true,
      useCompactStyle: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      firefox: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'firefox'
      },
      chrome: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'chrome'
      }
    },
    browsers: ['firefox', 'chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
