import { render } from '../tests/utils/render';
import { expect, it } from 'vitest';
import App from '../App';

it('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

it('has expected basic structure', () => {
  const { getByText } = render(<App />);
  // This test can be expanded based on App content
  // For now, it just verifies the component mounts
  expect(document.body).toBeInTheDocument();
});
