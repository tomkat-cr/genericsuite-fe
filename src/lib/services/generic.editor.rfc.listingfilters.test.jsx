import { GetFormData } from './generic.editor.rfc.service.jsx';

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));

const DummyComp = () => null;
const DummyFilter = () => null;

describe('GetFormData listingFilters resolution [GS-37]', () => {
    it('resolves listingFilters strings through the registry', () => {
        const editorData = {
            baseUrl: 'test_entity',
            component: 'DummyComp',
            fieldElements: [],
            listingFilters: ['DummyFilter'],
        };
        const registry = {
            DummyComp: DummyComp,
            DummyFilter: DummyFilter,
        };
        const result = GetFormData(editorData, registry, 'test');
        expect(result.listingFilters).toHaveLength(1);
        expect(result.listingFilters[0]).toBe(DummyFilter);
    });

    it('leaves configs without listingFilters untouched', () => {
        const editorData = {
            baseUrl: 'test_entity',
            component: 'DummyComp',
            fieldElements: [],
        };
        const result = GetFormData(editorData, { DummyComp }, 'test');
        expect(result.listingFilters).toBeUndefined();
    });
});
