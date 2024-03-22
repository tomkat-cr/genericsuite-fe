import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { HomePageGsFe } from "./HomePageGsFe";

describe("HomePageGsFe", () => {
    test("renders the HomePageGsFe component", () =>
        act(() => {
            render(<MemoryRouter><HomePageGsFe /></MemoryRouter>);
        })
    )
});
