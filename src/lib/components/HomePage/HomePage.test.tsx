import React from "react";
import renderer from 'react-test-renderer';
import { HomePage } from "./HomePage.jsx";
import { mockFetch } from '../../test-helpers/mock-fetch'

it("renders the HomePage component with the children text", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    const component = renderer.create(
        <HomePage
            appLogo={""}
        >
            <p>HomePage Children text 123</p>
            <p>HomePage Children text 456</p>
            <p>HomePage Children text 789</p>
        </HomePage>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
