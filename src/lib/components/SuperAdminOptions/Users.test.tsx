import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockAuthService, mockDefaultComponentMap, mockUserData } from '../../test-helpers/mocks'

import { Users } from "./Users";
import { UserProvider } from "../../helpers/UserContext.jsx";
import { AppProvider } from "../../helpers/AppContext";

// To fix the error:
// TypeError: Cannot read properties of null (reading 'id')
// at id (genericsuite-fe/src/lib/components/SuperAdminOptions/Users.jsx:124:38)
let mockJestObjects = [];
mockJestObjects.push(mockAuthService());
mockJestObjects.push(mockUserData());
let mockObj = null as any;
for (let i = 0; i < mockJestObjects.length; i++) {
    mockObj = mockJestObjects[i].response;
    jest.mock('../../' + mockJestObjects[i].codeFile, () => (mockObj));
}

describe("Users", () => {
    test("renders the Users component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider
                            globalComponentMap={mockDefaultComponentMap()}
                        >
                            <Users />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
