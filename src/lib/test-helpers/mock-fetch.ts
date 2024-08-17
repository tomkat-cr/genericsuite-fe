export function mockFetch(data: any, headers: any = null) {
    if (!headers) {
        headers = {'Content-Type': 'application/json'};
    }
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
        headers: new Headers(headers),
        text: () => Promise.resolve(JSON.stringify(data)),
        status: 200,
        statusText: '',
      }),
    );
}
export function mockUserData() {
  return {
    codeFile: 'helpers/UserContext.jsx',
    response: {
      currentUser: {
        id: 'mockedUserId',
        firstName: 'Mocked firstName',
        token: 'Mocked token',
      },
      registerUser: () => (null),
      unRegisterUser: () => (null),
    }
  };
}

export function mockAuthService() {
  return {
    codeFile: 'services/authentication.service.jsx',
    response: {
      authenticationService: {
        currentUserValue: {
          token: 'Mocked token',
        }
      },
      // To fix the error: "TypeError: (0 , _authenticationService.getUserData) is not a function"
      getUserData: () => Promise.resolve({
        error: false,
        error_message: null,
        resultset: {
          _id: 'mockedUserId',
          first_name: 'Mocked firstName',
          last_name: 'Mocked lastName',
          superuser: 0,
      }}),
      getCurrentUserData: () => Promise.resolve({resultset: {
        error: false,
        error_message: null,
        resultset: {
          _id: 'mockedUserId',
          first_name: 'Mocked firstName',
          last_name: 'Mocked lastName',
          superuser: 0,
        }
      }}),
    }
  };
}
