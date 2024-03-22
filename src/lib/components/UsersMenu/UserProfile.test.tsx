import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { UserProfileEditor } from "./UserProfile";

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
        act(() => {
            render(<MemoryRouter><UserProfileEditor /></MemoryRouter>);
        })
    )
});
