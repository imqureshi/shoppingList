module.exports = {
  // ...
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  transform: {},
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
