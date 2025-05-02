import React from "react";
import renderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

import { mockAuthService, mockDefaultComponentMap, mockUserData } from '../../test-helpers/mocks'

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

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

it("renders the Users component", () => {
    const component = renderer.create(
        // <MemoryRouter>
            <UserProvider>
                <AppProvider
                    globalComponentMap={mockDefaultComponentMap()}
                >
                    <Users />
                </AppProvider>
            </UserProvider>
        // </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
