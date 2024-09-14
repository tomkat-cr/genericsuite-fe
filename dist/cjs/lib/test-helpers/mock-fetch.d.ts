export declare function mockFetch(data: any, headers?: any): jest.Mock<any, any, any>;
export declare function mockUserData(): {
    codeFile: string;
    response: {
        currentUser: {
            id: string;
            firstName: string;
            token: string;
        };
        registerUser: () => null;
        unRegisterUser: () => null;
    };
};
export declare function mockAuthService(): {
    codeFile: string;
    response: {
        authenticationService: {
            currentUserValue: {
                token: string;
            };
        };
        getUserData: () => Promise<{
            error: boolean;
            error_message: null;
            resultset: {
                _id: string;
                first_name: string;
                last_name: string;
                superuser: number;
            };
        }>;
        getCurrentUserData: () => Promise<{
            resultset: {
                error: boolean;
                error_message: null;
                resultset: {
                    _id: string;
                    first_name: string;
                    last_name: string;
                    superuser: number;
                };
            };
        }>;
    };
};
export declare function mockDefaultComponentMap(): {
    defaultTheme: {
        light: {
            primary: string;
            secondary: string;
            text: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
        dark: {
            primary: string;
            secondary: string;
            text: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
    };
};
