module.exports = {
    testEnvironment: "jsdom",
    testEnvironmentOptions: { url: "http://localhost:3000/" },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};