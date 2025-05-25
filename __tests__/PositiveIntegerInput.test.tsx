import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import PositiveIntegerInput from '../components/Shared/PositiveIntegerInput';

describe('PositiveIntegerInput', () => {
  const mockOnChange = jest.fn();

  const renderInput = (props: Partial<React.ComponentProps<typeof PositiveIntegerInput>> = {}) => {
    return render(
      <ChakraProvider>
        <PositiveIntegerInput 
          value={props.value || ''} 
          onChange={props.onChange || mockOnChange} 
          {...props} 
        />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly with default props', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('pattern', '[0-9]*');
    expect(input).toHaveAttribute('maxlength', '4');
    expect(input).toHaveValue('');
  });

  it('renders with custom width and maxLength', () => {
    renderInput({ width: '200px', maxLength: 6 });
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('width: 200px');
    expect(input).toHaveAttribute('maxlength', '6');
  });

  it('accepts positive integers', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(mockOnChange).toHaveBeenCalledWith('123');
    
    fireEvent.change(input, { target: { value: '1' } });
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });

  it('rejects negative numbers and non-numeric input', () => {
    renderInput({ value: '123' });
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '-123' } });
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('123');
    
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('123');
    
    fireEvent.change(input, { target: { value: '12.3' } });
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('123');
  });

  it('allows empty input', () => {
    renderInput({ value: '123' });
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('respects maxLength', () => {
    renderInput({ maxLength: 3 });
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '1234' } });
    expect(mockOnChange).not.toHaveBeenCalled();
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(mockOnChange).toHaveBeenCalledWith('123');
  });

  it('passes through additional props to Input', () => {
    renderInput({ placeholder: 'Enter number', 'aria-label': 'Number input' });
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('placeholder', 'Enter number');
    expect(input).toHaveAttribute('aria-label', 'Number input');
  });

  it('maintains the previous value when invalid input is entered', () => {
    renderInput({ value: '123' });
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '12a' } });
    expect(input).toHaveValue('123');
    
    fireEvent.change(input, { target: { value: '1234' } }); // Assuming maxLength is 4
    expect(input).toHaveValue('123');
  });
});