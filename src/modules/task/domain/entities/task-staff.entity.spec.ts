import { PhoneVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';
import { TaskStaffEntity } from '@modules/task/domain';

describe('TaskStaffEntity', () => {
  let sut: TaskStaffEntity;
  const staff = StaffEntity.create({
    tgId: '1235',
    firstname: 'John',
    lastname: 'Doe',
    middleName: 'Johnovich',
    role: Role.ENGINEER,
    phone: new PhoneVO('+79991234567'),
  });
  beforeEach(() => {
    sut = TaskStaffEntity.create({
      staff,
      isAuthor: false,
      isResponsible: true,
    });
  });

  test('should become responsible', () => {
    sut.makeResponsible();

    expect(sut.isResponsible).toBe(true);
  });

  test('a comment should be added', () => {
    sut.comment = 'Comment';

    expect(sut.getCopiedProps().comment).toBe('Comment');
  });

  describe('isRead', () => {
    const entity = TaskStaffEntity.create({
      staff,
      isAuthor: false,
      isResponsible: true,
    });

    test('should get up read', () => {
      entity.markAsRead();

      expect(entity.getCopiedProps().isRead).toBe(true);
    });

    test('should get up unread', () => {
      entity.markAsUnread();

      expect(entity.getCopiedProps().isRead).toBe(false);
    });
  });
});
