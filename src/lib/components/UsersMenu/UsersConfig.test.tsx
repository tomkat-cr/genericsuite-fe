import React from "react";
import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

// Fix the "ReferenceError: Response is not defined" message
// $ npm install whatwg-fetch --save-dev
import 'whatwg-fetch';

import { mockDefaultComponentMap, mockFetch } from '../../test-helpers/mock-fetch'

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { UsersConfigComponent } from "./UsersConfig";

describe("UsersConfigComponent", () => {
    const mockFetchResponse = [{}];
    window.fetch = mockFetch(mockFetchResponse);
    test("renders the UsersConfigComponent component", () =>
        React.act(() => {
            render(
                <MemoryRouter>
                    <UserProvider>
                        <AppProvider
                            componentMap={mockDefaultComponentMap()}
                        >
                            <UsersConfigComponent
                                parentData={{}}
                            />
                        </AppProvider>
                    </UserProvider>
                </MemoryRouter>
            );
        })
    )
});
