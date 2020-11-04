import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
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

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];

    // click add button on the first appointment
    fireEvent.click(getByAltText(appointment, 'Add'));

    // enter the name "Lydia Miller-Jones" into the input with placeholder "enter student name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    // click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // click save button on that same appointment
    fireEvent.click(getByText(appointment, 'Save'));

    console.log(prettyDOM(appointment));
  });
});
