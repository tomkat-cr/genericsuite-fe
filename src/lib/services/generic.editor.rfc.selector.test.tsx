import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  getSelectDescription,
  SelectTableDescription,
  SelectTableOptions,
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

  it('falls back to client-side lookup when the FK value is a Mongo $oid object', async () => {
    const dbRow = { user_id: { $oid: 'aaa' } };
    render(
      <MainSectionContext.Provider value={providerValue}>
        <SelectTableDescription currentObj={currentObj} dbRow={dbRow} />
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

describe('SelectTableOptions', () => {
  const currentObj = {
    name: 'user_id',
    type: 'select_table',
    related_table: 'users',
    description_fields: ['firstname', 'lastname'],
  };

  it('renders a Select-an-option item plus one option per related row', async () => {
    render(
      <MainSectionContext.Provider value={providerValue}>
        <select>
          <SelectTableOptions currentObj={currentObj} />
        </select>
      </MainSectionContext.Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    );
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3); // placeholder + 2 rows
    expect((options[1] as HTMLOptionElement).value).toBe('aaa');
  });

  it('uses distinct cache keys for two select_table fields on the same related_table with different related_filter', async () => {
    // Two fields both point at 'users' but scope different subsets via
    // related_filter (e.g. active vs inactive users). If the cache key
    // only encodes the related_table, the second field's fetchOrCache
    // call would hit (and return) the first field's cached rows.
    const recordedKeys: string[] = [];
    const recordingProviderValue: any = {
      fetchOrCache: (key: string, fn: () => Promise<any>) => {
        recordedKeys.push(key);
        return fn();
      },
      debugCache: () => {},
    };
    const currentObjActive = {
      name: 'active_user_id',
      type: 'select_table',
      related_table: 'users',
      description_fields: ['firstname', 'lastname'],
      related_filter: { active: true },
    };
    const currentObjInactive = {
      name: 'inactive_user_id',
      type: 'select_table',
      related_table: 'users',
      description_fields: ['firstname', 'lastname'],
      related_filter: { active: false },
    };
    render(
      <MainSectionContext.Provider value={recordingProviderValue}>
        <select>
          <SelectTableOptions currentObj={currentObjActive} />
        </select>
        <select>
          <SelectTableOptions currentObj={currentObjInactive} />
        </select>
      </MainSectionContext.Provider>
    );
    await waitFor(() => expect(recordedKeys).toHaveLength(2));
    expect(recordedKeys[0]).not.toBe(recordedKeys[1]);
  });
});
