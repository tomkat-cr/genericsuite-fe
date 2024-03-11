import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { App } from "./App";

describe("App", () => {
    test("renders the App component", () =>
        act(() => {
            render(<MemoryRouter><App /></MemoryRouter>);
        })
    )
});
