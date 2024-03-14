import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  snapshotDir: "snapshots",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      grepInvert: [/@instable/, /*/@demo/*/],
    },

    {
      name: "chromium-highContrast",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
        contextOptions: { forcedColors: "active" },
      },
      grep: [/@visual/],
      grepInvert: [/@instable/, /@demo/],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      grepInvert: [/@instable/, /@demo/],
    },

    {
      name: "firefox-highContrast",
      use: {
        browserName: "firefox",
        colorScheme: "dark",
        contextOptions: { forcedColors: "active" },
        launchOptions: {
          firefoxUserPrefs: {
            "ui.caretBlinkTime": 0,
            "layout.spellcheckDefault": 0,
            "browser.display.document_color_use": 2,
            "browser.display.use_system_colors": false,
            "ui.use_standins_for_native_colors": false,
            "ui.highlight": "#00FFFF",
            "ui.highlighttext": "#000000",
            "ui.graytext": "#00FF00",
            "ui.buttonface": "#000000",
            "ui.buttontext": "#FFFFFF",
            "browser.anchor_color": "#FFFF00",
            "browser.display.background_color": "#000000",
            "browser.display.foreground_color": "#FFFFFF",
            "browser.visited_color": "#FFFF00",
            "browser.active_color": "#FFFF00",
          },
        },
      },
      grep: [/@visual/],
      grepInvert: [/@instable/, /@demo/],
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
