import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";
import { mockFetch } from '../../test-helpers/mock-fetch'

import { GeneralConfig } from "./GeneralConfig";

describe("GeneralConfig", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the GeneralConfig component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider>
                            <GeneralConfig />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
