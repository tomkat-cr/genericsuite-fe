import { setDefaultFieldValue } from './generic.editor.rfc.formpage.jsx';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// The "date" default must be the LOCAL calendar date of the browser.
// Clocks are built from local time parts, so the expected value is the same in every TZ.
// Run with TZ=America/Bogota (UTC-5) and TZ=Asia/Tokyo (UTC+9).
describe('setDefaultFieldValue for type date', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const setLocalClock = (y: number, m: number, d: number, h: number, min = 0) => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(y, m - 1, d, h, min, 0));
  };

  it('uses the local date at 21:00 (UTC-5 example: UTC date is the next day)', () => {
    setLocalClock(2026, 3, 15, 21);
    expect(setDefaultFieldValue({ type: 'date' })).toBe('2026-03-15');
  });

  it('uses the local date at 08:00 (UTC+9 example: UTC date is the previous day)', () => {
    setLocalClock(2026, 3, 15, 8);
    expect(setDefaultFieldValue({ type: 'date' })).toBe('2026-03-15');
  });

  it('uses the local date for default_value current_timestamp', () => {
    setLocalClock(2026, 3, 15, 21);
    expect(
      setDefaultFieldValue({ type: 'date', default_value: 'current_timestamp' })
    ).toBe('2026-03-15');
  });

  it('pads month and day with zeros', () => {
    setLocalClock(2026, 1, 5, 23, 59);
    expect(setDefaultFieldValue({ type: 'date' })).toBe('2026-01-05');
  });

  it('does not change the datetime-local default format', () => {
    setLocalClock(2026, 3, 15, 12);
    expect(setDefaultFieldValue({ type: 'datetime-local' })).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/
    );
  });
});
