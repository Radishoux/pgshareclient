import { render, screen, fireEvent } from '@testing-library/react';
import Craft from './Craft';

describe('Craft Component', () => {
  it('should render Craft component', () => {
    render(<Craft />);
    expect(screen.getByText(/Craft Page/i)).toBeInTheDocument();
  });

  it('should have submit button disabled when no image is uploaded', () => {
    render(<Craft />);
    expect(screen.getByText(/Submit/i)).toBeDisabled();
  });
});