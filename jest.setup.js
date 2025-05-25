import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => Promise.resolve()),
    };
  },
}));

// Add Chakra UI provider to all tests
global.ChakraProvider = ChakraProvider;
global.chakraTheme = theme;
