import { PhoneVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';
import { TaskEntity, TaskStaffEntity } from '@modules/task/domain';
import { TaskStatus } from '@modules/task/types';

describe('TaskEntity', () => {
  let sut: TaskEntity;
  const staff = StaffEntity.create({
    tgId: '1235',
    firstname: 'John',
    lastname: 'Doe',
    middleName: 'Johnovich',
    role: Role.ENGINEER,
    phone: new PhoneVO('+79991234567'),
  });
  beforeEach(() => {
    sut = TaskEntity.create({
      theme: 'Theme 1',
      description: 'Description',
      participants: [
        TaskStaffEntity.create({
          staff,
          isAuthor: false,
          isResponsible: true,
        }),
      ],
    });
  });

  test('should be able to create a task', () => {
    expect(sut).toBeDefined();
    expect(sut.status).toBe(TaskStatus.REGISTERED);
  });

  //TODO add tests
});
