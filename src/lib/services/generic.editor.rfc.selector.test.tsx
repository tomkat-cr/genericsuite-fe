import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  getSelectDescription,
  SelectTableDescription,
} from './generic.editor.rfc.selector.jsx';
import { MainSectionContext } from './generic.editor.rfc.provider.jsx';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('./db.service.jsx', () => ({
  dbApiService: jest.fn().mockImplementation(() => ({
    getAll: () =>
      Promise.resolve({
        resultset: [
          { _id: 'aaa', firstname: 'John', lastname: 'Doe' },
          { _id: 'bbb', firstname: 'Jane', lastname: 'Roe' },
        ],
      }),
    convertId: (id: any) => (id && id.$oid ? id.$oid : String(id)),
  })),
}));

const providerValue: any = {
  fetchOrCache: (_key: string, fn: () => Promise<any>) => fn(),
  debugCache: () => {},
};

describe('getSelectDescription - select_table', () => {
  const currentObj = {
    name: 'user_id',
    type: 'select_table',
    related_table: 'users',
    description_fields: ['firstname', 'lastname'],
  };

  it('returns the backend-resolved description when present', () => {
    const dbRow = { user_id: 'aaa', user_id_description: 'John Doe' };
    expect(getSelectDescription(currentObj, dbRow)).toBe('John Doe');
  });

  it('falls back to client-side lookup when description is absent', async () => {
    const dbRow = { user_id: 'aaa' };
    const element = getSelectDescription(currentObj, dbRow);
    render(
      <MainSectionContext.Provider value={providerValue}>
        {element}
      </MainSectionContext.Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    );
  });

  it('renders empty for a null FK value', async () => {
    const { container } = render(
      <MainSectionContext.Provider value={providerValue}>
        <SelectTableDescription currentObj={currentObj} dbRow={{}} />
      </MainSectionContext.Provider>
    );
    await waitFor(() => expect(container.textContent).toBe(''));
  });
});
