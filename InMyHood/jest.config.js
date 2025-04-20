/** jest.config.js **/
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // only look in src/ for tests and modules
  roots: ["<rootDir>/src"],

  // use the ts-jest preset to handle TypeScript files
  preset: "ts-jest",

  // test environment (Node.js)
  testEnvironment: "node",

  // treat .ts and .js as modules
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // automatically transform .ts files via ts-jest
 "transform": {
  "^.+\\.(ts|tsx)$": "ts-jest"
},
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // ensure it knows where your tsconfig is
    },
  
}
}
