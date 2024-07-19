import React, { act } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { act } from "react-dom/test-utils";

import { AboutBodyGsFe } from "./AboutBodyGsFe";


describe("AboutBodyGsFe", () => {
    test("renders the AboutBodyGsFe component", () =>
        React.act(() => {
            render(<MemoryRouter><AboutBodyGsFe /></MemoryRouter>);
        })
    )
});
