const baseUrl = 'https://opensource-demo.orangehrmlive.com';

Cypress.Commands.add('login', (user) => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}/web/index.php/auth/login`,
        followRedirect: false,
    })
        .then((response) => {
            let cookie = response.headers['set-cookie'][0].split(';')[0];
            let html = response.body;
            let token = html.match(/:token="(.*?)"/)[1].replace(/&quot;/g, '');
            cy.request({
                method: 'POST',
                url: `${baseUrl}/web/index.php/auth/validate`,
                followRedirect: false,
                headers: {
                    "Cookie": cookie
                },
                body: {
                    "_token": token,
                    "username": user.username,
                    "password": user.password,
                }
            })
        })
})

Cypress.Commands.add('createLeaveRequest', (data, cookie) => {
    cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/leave/leave-requests`,
        followRedirect: false,
        headers: {
            Cookie: cookie
        },
        body: {
            "leaveTypeId": data.leaveTypeId,
            "fromDate": data.fromDate,
            "toDate": data.toDate
        }
    })
})

Cypress.Commands.add('approveLeaveRequest', (leaveId, cookie) => {
    cy.request({
        method: 'PUT',
        url: `${baseUrl}/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
        followRedirect: false,
        headers: {
            Cookie: cookie
        },
        body: {
            "action": "APPROVE",
        }
    })
})

Cypress.Commands.add('rejectLeaveRequest', (leaveId, cookie) => {
    cy.request({
        method: 'PUT',
        url: `${baseUrl}/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
        followRedirect: false,
        headers: {
            Cookie: cookie
        },
        body: {
            "action": "REJECT",
        }
    })
})

Cypress.Commands.add('cancelLeaveRequest', (leaveId, cookie) => {
    cy.request({
        method: 'PUT',
        url: `${baseUrl}/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
        followRedirect: false,
        headers: {
            Cookie: cookie
        },
        body: {
            "action": "CANCEL",
        }
    })
})


