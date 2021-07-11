import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Image } from './Image';

expect.extend(toHaveNoViolations);

describe('Image', () => {
  it('fails when component is not accessible', async () => {
    const { container } = render(<Image accessible={false} />);
    const results = await axe(container);

    expect(results).not.toHaveNoViolations();
  });
  it('should have no violations when component is accessible', async () => {
    const { container } = render(<Image accessible={true} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
