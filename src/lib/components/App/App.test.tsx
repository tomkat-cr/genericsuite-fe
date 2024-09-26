import React from "react";
// import { render } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import { mockFetch } from '../../test-helpers/mock-fetch'

import { App } from "./App";

// describe("App", () => {
//     const mockFetchResponse = [{}];
//     window.fetch = mockFetch(mockFetchResponse);
//     test("renders the App component", () =>
//         React.act(() => {
//             render(
//                 <MemoryRouter>
//                     <App />
//                 </MemoryRouter>
//             );
//         })
//     )
// });

it("renders the AboutBody component with the children text", () => {
    const component = renderer.create(
        <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
