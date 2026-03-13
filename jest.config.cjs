module.exports = {
    testEnvironment: "jsdom",
    testEnvironmentOptions: { url: "http://localhost:3000/" },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
        '^bson$': '<rootDir>/node_modules/bson/lib/bson.cjs',
    },
};