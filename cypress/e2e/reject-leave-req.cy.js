describe('Manager rejects a leave request', () => {
  let cookie;
  let leaveId;

  it('Should reject leave request successfully when leave request exists', () => {
    // Execute API and store session cookie for the employee
    cy.fixture("employee").then((employee) => {
      cy.login(employee);
    }).then((response) => {
      cookie = response.headers['set-cookie'][0].split(';')[0];

      // Create leave request by employee cookie and store leave ID
      cy.fixture("leaveReqs").then((data) => {
        cy.createLeaveRequest(data[1], cookie);
      });
    }).then((response) => {
      leaveId = response.body.data.id;

      cy.clearAllCookies();

      // Store new session cookie for the manager
      cy.fixture("manager").then((manager) => {
        cy.login(manager);
      });
    }).then((response) => {
      cookie = response.headers['set-cookie'][0].split(';')[0];

      // Reject leave request by leaveId recently
      cy.rejectLeaveRequest(leaveId, cookie);
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).has.property('id', leaveId);
    });
  });
});
