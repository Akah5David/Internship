export default {
  preset: "ts-jest", // if using TypeScript, otherwise remove this
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};
