import React, { act } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";
import { AppFooter } from "./AppFooter";


describe("AppFooter", () => {
    test("renders the AppFooter component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider>
                            <AppFooter />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
