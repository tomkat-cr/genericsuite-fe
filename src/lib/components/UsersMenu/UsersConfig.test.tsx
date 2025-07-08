import React from "react";
import renderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

// Fix the "ReferenceError: Response is not defined" message
// $ npm install whatwg-fetch --save-dev
import 'whatwg-fetch';

import { mockDefaultComponentMap, mockFetch } from '../../test-helpers/mocks'

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { UsersConfigComponent } from "./UsersConfig";

it("renders the UsersConfigComponent component", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    
    const component = renderer.create(
        // <MemoryRouter>
            <UserProvider>
                <AppProvider
                    globalComponentMap={mockDefaultComponentMap()}
                >
                    <UsersConfigComponent
                        parentData={{}}
                    />
                </AppProvider>
            </UserProvider>
        // </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
