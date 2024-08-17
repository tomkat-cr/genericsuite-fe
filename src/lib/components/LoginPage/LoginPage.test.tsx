import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../../helpers/UserContext";

import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
    test("renders the LoginPage component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <LoginPage />
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
