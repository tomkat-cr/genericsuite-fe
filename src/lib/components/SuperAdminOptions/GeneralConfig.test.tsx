import React from "react";
import renderer from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap, mockFetch } from '../../test-helpers/mocks'

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { GeneralConfig } from "./GeneralConfig";

it("renders the GeneralConfig component", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    
    const component = renderer.create(
        // <MemoryRouter>
            <UserProvider>
                <AppProvider
                    globalComponentMap={mockDefaultComponentMap()}
                >
                    <GeneralConfig />
                </AppProvider>
            </UserProvider>
        // </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
