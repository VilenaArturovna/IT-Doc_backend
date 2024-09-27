import { DateVO } from '@libs/value-objects';
import { VendorEntity } from '@modules/warehouse/domain';

describe('Vendor', () => {
  let vendor: VendorEntity;
  beforeAll(() => {
    vendor = VendorEntity.create({
      title: 'test',
      description: 'testing vendor',
    });
  });

  test('should be created', () => {
    const props = vendor.getCopiedProps();

    expect(vendor.id).toBeDefined();
    expect(props.description).toBe('testing vendor');
    expect(props.title).toBe('test');
  });

  test('should be updated without description', () => {
    vendor.update({ title: 'test2', description: undefined });
    const props = vendor.getCopiedProps();
    const now = DateVO.now();
    const updatedAtIsNotAfter = !vendor.updatedAt.isAfter(now);

    expect(props.description).toBe(undefined);
    expect(props.title).toBe('test2');
    expect(updatedAtIsNotAfter).toBe(true);
  });

  test('should be updated with new description', () => {
    vendor.update({ title: 'test2', description: 'desc' });
    const props = vendor.getCopiedProps();

    expect(props.description).toBe('desc');
    expect(props.title).toBe('test2');
  });
});
