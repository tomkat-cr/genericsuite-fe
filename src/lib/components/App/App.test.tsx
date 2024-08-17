import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockFetch } from '../../test-helpers/mock-fetch'

import { App } from "./App";

describe("App", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the App component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
        })
    )
});
