# PG-Repo
temp code for playing around a copy/paste
set up Jest with React Testing Library for your React project, you need to install several dependencies:

1. **Jest:** The core testing framework.
2. **React Testing Library (RTL):** Provides utility functions for testing React components.
3. **@testing-library/jest-dom:** Provides custom jest matchers to test the state of the DOM.
4. **@testing-library/user-event:** Allows you to simulate user interactions.
5. **babel-jest:** If you're using Babel, you'll need this to transpile your tests.
6. **jest-environment-jsdom:** An environment within Jest to simulate the browser's Document Object Model (DOM).

To install these dependencies, you can use npm or yarn. Here are the commands using npm:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest jest-environment-jsdom
```

In addition to installing these libraries, you need to configure Jest to work with your React project. This usually involves creating a `jest.config.js` file at the root of your project, if you don't already have one. Here's an example of what your `jest.config.js` might include:

```javascript
module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Load jest-dom matchers
  testEnvironment: 'jest-environment-jsdom', // Use jsdom environment
  moduleNameMapper: {
    // If you're using CSS modules or similar, add mappings here
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    // Transform files with babel-jest
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
```

Furthermore, you might need to set up Babel for transpiling your ES6/JSX code. This is often already configured for React projects, but if not, you'll need a `.babelrc` file or babel configuration in your `package.json`. A simple `.babelrc` configuration would look like this:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Finally, consider the following files and configurations you may need:

- **Mock files**: For mocking static assets like images and styles, you may need to configure Jest to use mock files. This can be done within the `jest.config.js`.
- **Global mocks**: If you're using global objects like `localStorage` or `sessionStorage` in the browser, you'll need to mock them in your tests. This can be done in a setup file specified in `setupFilesAfterEnv`.
- **Test files**: Write your test files with a `.test.js` or `.spec.js` suffix. Jest will automatically find and run files with these suffixes.
- **Code coverage**: If you want to collect code coverage, Jest can do this for you with the `--coverage` flag.
- **ESLint**: If you're using ESLint, make sure to install the Jest plugin and configure your `.eslintrc` to include Jest globals.

Make sure to check your `package.json` for a `test` script, and update it to run Jest if necessary:

```json
"scripts": {
  "test": "jest"
}
```

With this setup, you should be ready to start writing and running tests for your React components.
