// tests/__mocks__/chalk.ts
const chalk = {
  blue: jest.fn((text) => `blue:${text}`),
  yellow: jest.fn((text) => `yellow:${text}`),
  magenta: jest.fn((text) => `magenta:${text}`),
  green: jest.fn((text) => `green:${text}`),
  gray: jest.fn((text) => `gray:${text}`),
  white: jest.fn((text) => `white:${text}`),
  red: jest.fn((text) => `red:${text}`),
  bold: jest.fn((text) => `bold:${text}`),
  cyan: jest.fn((text) => `cyan:${text}`),
};

export default chalk;