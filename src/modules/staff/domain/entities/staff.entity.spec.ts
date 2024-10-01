import { DateVO, PhoneVO, UrlVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';

describe('Staff Entity', () => {
  let sut: StaffEntity;
  beforeEach(() => {
    sut = StaffEntity.create({
      tgId: '1235',
      firstname: 'John',
      lastname: 'Doe',
      middleName: 'Johnovich',
      role: Role.ENGINEER,
      phone: new PhoneVO('+79991234567'),
      birthdate: new DateVO('2001-01-01T00:00:00.000Z'),
    });
  });

  test('should be created', () => {
    expect(sut.id).toBeDefined();
    expect(sut.isRemoved).toBe(false);
    expect(sut.isFirstEntrance).toBe(true);
  });

  test('should be get full name', () => {
    const name = sut.name;

    expect(name.middleName).toEqual('Johnovich');
    expect(name.firstname).toEqual('John');
    expect(name.lastname).toEqual('Doe');
  });

  test('should be marked that you have already logged in to the system', () => {
    sut.enteredForFirstTime();

    expect(sut.isFirstEntrance).toBe(false);
  });

  test('should be updated', () => {
    const birthdate = new DateVO('1998-01-01T00:00:00.000Z');
    const avatar = new UrlVO('https://asd.ru/457/ty.img');
    const phone = new PhoneVO('+79990000012');
    const initialProps = sut.getCopiedProps();
    sut.update({
      firstname: 'Jane',
      lastname: 'Doe',
      middleName: 'Ivanovna',
      phone,
      birthdate,
      avatar,
    });
    const props = sut.getCopiedProps();

    expect(props.firstname).toBe('Jane');
    expect(props.lastname).toBe('Doe');
    expect(props.middleName).toBe('Ivanovna');
    expect(props.birthdate.equals(birthdate)).toBe(true);
    expect(props.avatar.equals(avatar)).toBe(true);
    expect(props.phone.equals(phone)).toBe(true);
    expect(props.isFirstEntrance === initialProps.isFirstEntrance).toBe(true);
    expect(props.isRemoved === initialProps.isRemoved).toBe(true);
    expect(props.role === initialProps.role).toBe(true);
    expect(props.tgId === initialProps.tgId).toBe(true);
    expect(props.tgUsername === initialProps.tgUsername).toBe(true);
  });

  test('should be removed', () => {
    sut.remove();

    expect(sut.isRemoved).toBe(true);
  });

  test('should be activated', () => {
    const tgUsername = 'john69';
    const avatar = new UrlVO('https://asd.ru/ty.img');
    sut.activate(tgUsername, avatar);
    const props = sut.getCopiedProps();

    expect(props.avatar.equals(avatar)).toBeTruthy();
    expect(props.tgUsername).toBe(tgUsername);
  });
});
