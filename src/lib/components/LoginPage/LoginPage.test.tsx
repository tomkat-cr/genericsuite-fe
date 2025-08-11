import React from "react";
import renderer, { act } from 'react-test-renderer';
// import { MemoryRouter } from "react-router-dom";

import { mockDefaultComponentMap } from "../../test-helpers/mocks";

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

import { UserProvider } from "../../helpers/UserContext";
import { AppProvider } from "../../helpers/AppContext";

import { LoginPage } from "./LoginPage";
import { Formik } from 'formik';

// Mock authentication service to resolve login successfully
jest.mock('../../services/authentication.service.jsx', () => ({
    authenticationService: {
        login: jest.fn(() => Promise.resolve({ token: 'mock', firstname: 'Test' })),
        currentUser: { asObservable: () => ({ subscribe: jest.fn() }) },
        get currentUserValue() { return null; }
    }
}));

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('LoginPage', () => {
    const TEST_ORIGIN = 'http://localhost:3000';
    let originalLocation: Location;
    let assignedHref = '';

    beforeEach(() => {
        assignedHref = '';
        originalLocation = window.location as any;
        // allow redefining window.location
        // @ts-ignore
        delete (window as any).location;
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...new URL(TEST_ORIGIN + '/'),
                get href() { return assignedHref || `${TEST_ORIGIN}/`; },
                set href(val: string) { assignedHref = val; },
                origin: TEST_ORIGIN,
            }
        });
    });

    afterEach(() => {
        // Restore original location
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation
        });
        jest.clearAllMocks();
        localStorage.clear();
    });

    it("renders the LoginPage component", () => {
        const component = renderer.create(
            // <MemoryRouter>
                <UserProvider>
                    <AppProvider
                        globalComponentMap={mockDefaultComponentMap()}
                    >
                        <LoginPage />
                    </AppProvider>
                </UserProvider>
            // </MemoryRouter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('redirects to a safe relative path from redirect param (happy path)', async () => {
        const component = renderer.create(
            <UserProvider>
                <AppProvider globalComponentMap={mockDefaultComponentMap()}>
                    <LoginPage location={{ search: '?redirect=/dashboard?x=1#tab' } as any} />
                </AppProvider>
            </UserProvider>
        );

        const formik = component.root.findByType(Formik);
        await act(async () => {
            await formik.props.onSubmit({ username: 'user', password: 'pass' }, { setStatus: jest.fn(), setSubmitting: jest.fn() });
            await flushPromises();
        });

        expect(assignedHref).toBe('/dashboard?x=1#tab');
    });

    it('redirects to a safe absolute path from redirect param (happy path)', async () => {
        const component = renderer.create(
            <UserProvider>
                <AppProvider globalComponentMap={mockDefaultComponentMap()}>
                    <LoginPage location={{ search: '?redirect=' + TEST_ORIGIN + '/ai_chabot#specific_section?conversation=xxxyyyzzz&otherparam=123' } as any} />
                </AppProvider>
            </UserProvider>
        );

        const formik = component.root.findByType(Formik);
        await act(async () => {
            await formik.props.onSubmit({ username: 'user', password: 'pass' }, { setStatus: jest.fn(), setSubmitting: jest.fn() });
            await flushPromises();
        });

        expect(assignedHref).toBe('/ai_chabot#specific_section?conversation=xxxyyyzzz&otherparam=123');
    });

    it('sanitizes a cross-origin redirect param to root (sad path)', async () => {
        const component = renderer.create(
            <UserProvider>
                <AppProvider globalComponentMap={mockDefaultComponentMap()}>
                    <LoginPage location={{ search: '?redirect=https://evil.com/pwn' } as any} />
                </AppProvider>
            </UserProvider>
        );

        const formik = component.root.findByType(Formik);
        await act(async () => {
            await formik.props.onSubmit({ username: 'user', password: 'pass' }, { setStatus: jest.fn(), setSubmitting: jest.fn() });
            await flushPromises();
        });

        expect(assignedHref).toBe('/');
    });
});
