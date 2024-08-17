import React, { act } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { act } from "react-dom/test-utils";

import { UserProvider } from "../../helpers/UserContext";
import { AboutBodyGsFe } from "./AboutBodyGsFe";


describe("AboutBodyGsFe", () => {
    test("renders the AboutBodyGsFe component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AboutBodyGsFe />
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
