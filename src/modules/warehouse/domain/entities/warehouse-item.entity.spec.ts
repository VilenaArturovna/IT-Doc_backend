import { DateVO, MoneyVO } from '@libs/value-objects';
import {
  ProviderEntity,
  VendorEntity,
  WarehouseItemEntity,
} from '@modules/warehouse/domain';
import { Section, Unit } from '@modules/warehouse/types';

describe('WarehouseItem', () => {
  const price = MoneyVO.toVO({ amount: '2300' });
  let item: WarehouseItemEntity;
  const cartridge = WarehouseItemEntity.create({
    title: 'Cartridge',
    vendor: VendorEntity.create({ title: 'Vendor' }),
    balance: 5,
    criticalMargin: 2,
    unit: Unit.PIECE,
    provider: ProviderEntity.create({ title: 'Provider' }),
    section: Section.MATERIAL,
    price,
  });
  beforeEach(() => {
    item = cartridge;
  });

  test('should be created with only required fields', () => {
    const props = item.getCopiedProps();

    expect(item).toBeTruthy();
    expect(item.id).toBeDefined();
    expect(item.title).toBe('Cartridge');
    expect(item.price.equals(price)).toBeTruthy();
    expect(item.balance).toBe(5);
    expect(props.vendor).toBeDefined();
    expect(props.provider).toBeDefined();
    expect(props.criticalMargin).toBe(2);
    expect(props.unit).toBe(Unit.PIECE);
    expect(props.isArchived).toBe(false);
    expect(props.section).toBe(Section.MATERIAL);
    expect(props.partNumber).not.toBeDefined();
    expect(props.compatibleModels).not.toBeDefined();
    expect(props.packing).not.toBeDefined();
    expect(props.expense).not.toBeDefined();
    expect(props.expenseReserve).not.toBeDefined();
    expect(props.nextDeliveryDate).not.toBeDefined();
  });

  test('should be updated', () => {
    const initialProps = item.getCopiedProps();
    const newPrice = MoneyVO.toVO({ amount: '2000' });
    item.update({
      title: 'Cartridge BM12',
      vendor: VendorEntity.create({ title: 'Vendor2' }),
      provider: ProviderEntity.create({ title: 'Provider2' }),
      balance: 15,
      criticalMargin: 3,
      price: newPrice,
    });
    const props = item.getCopiedProps();

    expect(props.unit).toBe(initialProps.unit);
    expect(props.isArchived).toBe(initialProps.isArchived);
    expect(props.section).toBe(initialProps.section);
    expect(props.balance).toBe(15);
    expect(props.vendor.id).not.toBe(initialProps.vendor.id);
    expect(props.provider.id).not.toBe(initialProps.provider.id);
    expect(item.title).toBe('Cartridge BM12');
    expect(props.criticalMargin).toBe(3);
    expect(item.price.equals(newPrice)).toBeTruthy();
    expect(props.partNumber).not.toBeDefined();
    expect(props.compatibleModels).not.toBeDefined();
    expect(props.packing).not.toBeDefined();
    expect(props.expense).not.toBeDefined();
    expect(props.expenseReserve).not.toBeDefined();
    expect(props.nextDeliveryDate).not.toBeDefined();
  });

  test('should be updated with optional fields', () => {
    const initialProps = item.getCopiedProps();
    item.update({
      ...initialProps,
      compatibleModels: 'HP2310, Samsung 4500',
      partNumber: '682hl38',
      nextDeliveryDate: DateVO.now().addMinutes(800),
    });
    const props = item.getCopiedProps();

    expect(props.compatibleModels).toBe('HP2310, Samsung 4500');
    expect(props.partNumber).toBe('682hl38');
    expect(props.nextDeliveryDate.isAfter(DateVO.now())).toBeTruthy();
  });

  test('should be archived', () => {
    item.archive();

    expect(item.getCopiedProps().isArchived).toBe(true);
  });

  describe('reservation', () => {
    let item: WarehouseItemEntity;
    beforeAll(() => {
      item = cartridge;
    });

    test('should be reduced by the amount of reserve', () => {
      const initialProps = item.getCopiedProps();
      const quantity = 2;
      item.reserve(quantity);

      expect(item.getCopiedProps().balance).toBe(
        initialProps.balance - quantity,
      );
    });

    test('should be increased by the amount of reserve', () => {
      const initialProps = item.getCopiedProps();
      const quantity = 2;
      item.cancelReservation(quantity);

      expect(item.getCopiedProps().balance).toBe(
        initialProps.balance + quantity,
      );
    });
  });
});
