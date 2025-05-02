import React from "react";
import renderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";

import { HomePageGsFe } from "./HomePageGsFe";

it("renders the HomePageGsFe component", () => {
    const component = renderer.create(
        // <MemoryRouter>
            <UserProvider>
                <HomePageGsFe />
            </UserProvider>
        // </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
