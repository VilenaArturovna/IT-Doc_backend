import { DateVO } from '@libs/value-objects';
import { ProviderEntity } from '@modules/warehouse/domain';

describe('Provider', () => {
  let provider: ProviderEntity;
  beforeAll(() => {
    provider = ProviderEntity.create({
      title: 'test',
      description: 'testing provider',
    });
  });

  test('should be created', () => {
    const props = provider.getCopiedProps();

    expect(provider.id).toBeDefined();
    expect(props.description).toBe('testing provider');
    expect(props.title).toBe('test');
  });

  test('should be updated without description', () => {
    provider.update({ title: 'test2', description: undefined });
    const props = provider.getCopiedProps();
    const now = DateVO.now();
    const updatedAtIsNotAfter = !provider.updatedAt.isAfter(now);

    expect(props.description).toBe(undefined);
    expect(props.title).toBe('test2');
    expect(updatedAtIsNotAfter).toBe(true);
  });

  test('should be updated with new description', () => {
    provider.update({ title: 'test2', description: 'desc' });
    const props = provider.getCopiedProps();

    expect(props.description).toBe('desc');
    expect(props.title).toBe('test2');
  });
});
