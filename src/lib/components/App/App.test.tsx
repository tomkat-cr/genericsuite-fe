import React from "react";
import renderer from 'react-test-renderer';

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { App } from "./App";

it("renders the AboutBody component with the children text", () => {
    const component = renderer.create(
        <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
