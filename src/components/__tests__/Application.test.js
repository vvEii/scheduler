import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  queryByText,
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

    // confirm the saving status is displayed
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    // confirm the student name is displayed after the saving indicator is hidden
    await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'));
    //debug();
    // find the specfic node that contains text "Monday"
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    // it should be "1 spot remaining" instead of "no spots remainning" because it's using WebSocket 
    // to update the remaining spots
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
});
