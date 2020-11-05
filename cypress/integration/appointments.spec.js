describe('Appoinments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');

    cy.visit('/');

    cy.contains('Monday');
  });

  it('should book an interview', () => {
    // Clicks on the "Add" button in the second appointment
    cy.get('[alt=Add]').first().click();
    // Enters their name
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains('Save').click();
    // Sees the booked appointment
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    // clicks the edit button for the existing appointment
    cy.get('[alt=Edit]').first().click({ force: true });

    // changes the name and interviewer
    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Lydia Miller-Jones');
    cy.get("[alt='Tori Malcolm']").click();

    // clicks the save button
    cy.contains('Save').click();
    // sees the edit to the appointment
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    // clicks the delete button for the existing appointment
    cy.get('[alt=Delete]').first().click({ force: true });

    // clicks the confirm button
    cy.contains('Confirm').click();

    // sees that the deleting status show and disappear
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    // sees that the appointment slot is empty
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
