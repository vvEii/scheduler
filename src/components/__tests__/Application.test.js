import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
  // it('loads data, books an interview and reduces the spots remaining for the first day by 1', () => {
  //   const { container } = render(<Application />);
  //   console.log(prettyDOM(container));
  // });
});
