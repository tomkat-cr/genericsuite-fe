import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { GeneralConfig } from "./GeneralConfig";
import { mockFetch } from '../../test-helpers/mock-fetch'

describe("GeneralConfig", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the GeneralConfig component", () =>
        React.act(() => {
            render(<MemoryRouter><GeneralConfig /></MemoryRouter>);
        })
    )
});
