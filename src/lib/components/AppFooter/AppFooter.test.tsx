import React from "react";
import renderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap } from "../../test-helpers/mocks";

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";
import { AppFooter } from "./AppFooter";


it("renders the AppFooter component", () => {
    const component = renderer.create(
        // <MemoryRouter>
            <UserProvider>
                <AppProvider
                    globalComponentMap={mockDefaultComponentMap()}
                >
                    <AppFooter />
                </AppProvider>
            </UserProvider>
        // </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
