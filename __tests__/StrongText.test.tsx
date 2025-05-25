import { render, screen } from '@testing-library/react';
import StrongText from '../components/Shared/StrongText';

describe('StrongText', () => {
  const testText = 'Test Text';

  it('renders the children text', () => {
    render(<StrongText>{testText}</StrongText>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<StrongText>{testText}</StrongText>);
    expect(screen.getByText(testText).tagName).toBe('SPAN');
  });

  it('has bold font weight', () => {
    render(<StrongText>{testText}</StrongText>);
    const element = screen.getByText(testText);
    expect(element).toHaveStyle('font-weight: bold');
  });

  it('has inline display', () => {
    render(<StrongText>{testText}</StrongText>);
    const element = screen.getByText(testText);
    expect(element).toHaveStyle('display: inline');
  });

  it('passes through additional props', () => {
    const testId = 'strong-text';
    const color = 'red.500';
    render(
      <StrongText data-testid={testId} color={color}>
        {testText}
      </StrongText>
    );
    
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(testText);
    // For Chakra UI specific props, you might need to check the rendered class or style
    // This depends on how Chakra processes the props
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<StrongText>{testText}</StrongText>);
    expect(asFragment()).toMatchSnapshot();
  });
});