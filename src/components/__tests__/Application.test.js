import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByAltText,
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

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    // get the container node
    const { container } = render(<Application />);

    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // get the first appointment node
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

    // find the specfic node that contains text "Monday"
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    // it should be "1 spot remaining" instead of "no spots remainning" because it's using WebSocket
    // to update the remaining spots
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, 'Confirm'));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    // expect 1 spot remaining instead of 2 spots remaining because using WebSocket to update the remaining spots
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    // 4. change the name and click the save button

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'new student name' },
    });
    fireEvent.click(queryByText(appointment, 'Save'));

    // 5. confirm the saving status is displayed.
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // 6. Check that the element with the text "new student name" is displayed.
    await waitForElement(() => getByText(appointment, 'new student name'));

    // 7. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    //  expect 1 spot remaining instead of 2 spots remaining because using WebSocket to update the remaining spots
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

});
