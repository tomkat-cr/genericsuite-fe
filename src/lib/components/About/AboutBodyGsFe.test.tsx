import React, { act } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap } from "../../test-helpers/mocks";

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { AboutBodyGsFe } from "./AboutBodyGsFe";


describe("AboutBodyGsFe", () => {
    test("renders the AboutBodyGsFe component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider
                            globalComponentMap={mockDefaultComponentMap()}
                        >
                            <AboutBodyGsFe />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
