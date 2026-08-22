import '@testing-library/jest-dom';

window.scrollTo = () => {};

const originalWarn = console.warn;
const reactRouterWarnings = [
  'React Router Future Flag Warning',
  'React Router will begin wrapping state updates in `React.startTransition` in v7',
  'Relative route resolution within Splat routes is changing in v7',
];
console.warn = (...args) => {
  if (reactRouterWarnings.some((msg) => typeof args[0] === 'string' && args[0].includes(msg))) {
    return;
  }
  originalWarn.apply(console, args);
};

const originalError = console.error;
const ignoredErrors = [
  'Not implemented: window.scrollTo',
  'An update to %s inside a test was not wrapped in act',
];
console.error = (...args) => {
  if (ignoredErrors.some((msg) => typeof args[0] === 'string' && args[0].includes(msg))) {
    return;
  }
  originalError.apply(console, args);
};
