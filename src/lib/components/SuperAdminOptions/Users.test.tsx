import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { Users } from "./Users";

describe("Users", () => {
    test("renders the Users component", () =>
        act(() => {
            render(<MemoryRouter><Users /></MemoryRouter>);
        })
    )
});
