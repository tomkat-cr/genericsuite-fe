import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Fix the "ReferenceError: Response is not defined" message
// $ npm install whatwg-fetch --save-dev
import 'whatwg-fetch';

import { UsersConfigComponent } from "./UsersConfig";

describe("UsersConfigComponent", () => {
    test("renders the UsersConfigComponent component", () =>
        act(() => {
            render(
                <MemoryRouter>
                    <UsersConfigComponent
                        parentData={{}}
                    />
                </MemoryRouter>
            );
        })
    )
});
