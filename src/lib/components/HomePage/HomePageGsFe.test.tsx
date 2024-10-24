import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";

import { HomePageGsFe } from "./HomePageGsFe";

describe("HomePageGsFe", () => {
    test("renders the HomePageGsFe component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <HomePageGsFe />
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
