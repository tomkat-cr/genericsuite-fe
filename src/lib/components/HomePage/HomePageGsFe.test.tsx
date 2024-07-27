import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { HomePageGsFe } from "./HomePageGsFe";

describe("HomePageGsFe", () => {
    test("renders the HomePageGsFe component", () =>
        React.act(() => {
            render(<MemoryRouter><HomePageGsFe /></MemoryRouter>);
        })
    )
});
