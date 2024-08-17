import React from "react";
// import { render } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import { App } from "../App/App.jsx";
import { mockFetch, mockAuthService, mockUserData } from '../../test-helpers/mock-fetch'

import { UserProfileEditor } from "./UserProfile";

let mockJestObjects = [];
mockJestObjects.push(mockAuthService());
mockJestObjects.push(mockUserData());
let mockObj = null as any;
for (let i = 0; i < mockJestObjects.length; i++) {
    mockObj = mockJestObjects[i].response;
    jest.mock('../../' + mockJestObjects[i].codeFile, () => (mockObj));
}

it("renders the UserProfileEditor", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    const component = renderer.create(
        <MemoryRouter>
            <App
                componentMap={{}}
                appLogo={null}
            >
                <UserProfileEditor/>
            </App>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
