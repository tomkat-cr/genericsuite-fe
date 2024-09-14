import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap } from "../../test-helpers/mock-fetch";

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
    test("renders the LoginPage component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider
                            componentMap={mockDefaultComponentMap()}
                        >
                            <LoginPage />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
