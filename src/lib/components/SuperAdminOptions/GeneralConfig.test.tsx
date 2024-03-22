import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { GeneralConfig } from "./GeneralConfig";

describe("GeneralConfig", () => {
    test("renders the GeneralConfig component", () =>
        act(() => {
            render(<MemoryRouter><GeneralConfig /></MemoryRouter>);
        })
    )
});
