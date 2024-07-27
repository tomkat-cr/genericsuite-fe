import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProfileEditor } from "./UserProfile";
import { mockFetch } from '../../test-helpers/mock-fetch'

const mockFetchResponse = [{}];
window.fetch = mockFetch(mockFetchResponse);

jest.mock('../../services/authentication.service.jsx', () => ({
  authenticationService: {
    currentUserValue: {
        id: 'mockedUserId',
        username: "Mocked Username",
        firstName: 'Mocked firstName',
        lastName: 'Mocked lastName',
        token: 'Mocked token',
    }
  }
}));

describe("UserProfileEditor", () => {
    test("renders the UserProfileEditor component", () =>
        React.act(() => {
            render(<MemoryRouter><UserProfileEditor /></MemoryRouter>);
        })
    )
});
