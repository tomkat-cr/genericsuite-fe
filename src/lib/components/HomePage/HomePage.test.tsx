import React from "react";
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import { mockFetch, mockAuthService, mockUserData } from '../../test-helpers/mock-fetch'

import { App } from "../App/App.jsx";
import { HomePage } from "./HomePage.jsx";

let mockJestObjects = [];
mockJestObjects.push(mockAuthService());
mockJestObjects.push(mockUserData());
let mockObj = null as any;
for (let i = 0; i < mockJestObjects.length; i++) {
    mockObj = mockJestObjects[i].response;
    jest.mock('../../' + mockJestObjects[i].codeFile, () => (mockObj));
}

it("renders the HomePage component with the children text", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    const component = renderer.create(
        <MemoryRouter>
            <App
                componentMap={{}}
                appLogo={null}
            >
                <HomePage
                    appLogo={""}
                >
                    <p>HomePage Children text 123</p>
                    <p>HomePage Children text 456</p>
                    <p>HomePage Children text 789</p>
                </HomePage>
            </App>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
