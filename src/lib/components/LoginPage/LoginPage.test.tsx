import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
    test("renders the LoginPage component", () =>
        act(() => {
            render(<MemoryRouter><LoginPage /></MemoryRouter>);
        })
    )
});
