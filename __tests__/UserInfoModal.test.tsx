import { render, screen, fireEvent } from '@testing-library/react';
import UserInfoModal from '../components/User/UserInfoModal';
import '@testing-library/jest-dom';

describe('UserInfoModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    initialUsername: '',
    initialJobTitle: '',
  };

  it('renders modal correctly', () => {
    render(<UserInfoModal {...defaultProps} />);
    expect(screen.getByTestId('user-info-modal')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('job-title-input')).toBeInTheDocument();
  });

  it('shows validation messages when inputs are empty and submit is clicked', () => {
    render(<UserInfoModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('username-error')).toBeInTheDocument();
    expect(screen.getByTestId('job-title-error')).toBeInTheDocument();
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid input', () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(
      <UserInfoModal
        {...defaultProps}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'Damon' } });
    fireEvent.change(screen.getByTestId('job-title-input'), { target: { value: 'Developer' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(onSubmit).toHaveBeenCalledWith('Damon', 'Developer');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = jest.fn();
    render(<UserInfoModal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(onClose).toHaveBeenCalled();
  });
});
