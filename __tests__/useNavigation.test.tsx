import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useNavigation } from '../hooks/useNavigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('useNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it('should return a navigateTo function', () => {
    const { result } = renderHook(() => useNavigation());
    expect(result.current.navigateTo).toBeInstanceOf(Function);
  });

  it('should call router.push with the provided path', () => {
    const testPath = '/test-path';
    const { result } = renderHook(() => useNavigation());
    
    result.current.navigateTo(testPath);
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(testPath);
  });

  it('should handle empty path', () => {
    const { result } = renderHook(() => useNavigation());
    
    result.current.navigateTo('');
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('');
  });

  it('should handle complex paths', () => {
    const complexPath = '/products/123?sort=price&filter=in-stock';
    const { result } = renderHook(() => useNavigation());
    
    result.current.navigateTo(complexPath);
    
    expect(mockPush).toHaveBeenCalledWith(complexPath);
  });
});