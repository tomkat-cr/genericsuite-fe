import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Users } from "./Users";
import { mockFetch } from '../../test-helpers/mock-fetch'

// To fix the error:
// TypeError: Cannot read properties of null (reading 'id')
// at id (genericsuite-fe/src/lib/components/SuperAdminOptions/Users.jsx:124:38)
const currentUserValue = {
    id: 'mockedUserId',
    username: "Mocked Username",
    firstName: 'Mocked firstName',
    lastName: 'Mocked lastName',
    token: 'Mocked token',
    superuser: 0,
}

jest.mock('../../services/authentication.service.jsx', () => ({
    authenticationService: {
        currentUserValue: currentUserValue,
    },
    // To fix the error: "TypeError: (0 , _authenticationService.getUserData) is not a function"
    getUserData: () => Promise.resolve({resultset: currentUserValue}),
}));
  
describe("Users", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the Users component", () =>
        React.act(() => {
            render(<MemoryRouter><Users /></MemoryRouter>);
        })
    )
});
