import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap, mockFetch } from '../../test-helpers/mocks'

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { GeneralConfig } from "./GeneralConfig";

describe("GeneralConfig", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the GeneralConfig component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider
                            globalComponentMap={mockDefaultComponentMap()}
                        >
                            <GeneralConfig />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
