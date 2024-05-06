import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetOneTaskQuery } from '@modules/task/queries';
import { Model } from 'objection';

import { GetOneTaskDaoModel, GetOneTaskReadDao } from './get-one-task.read.dao';

export class GetOneTaskObjectionReadDao extends GetOneTaskReadDao {
  async query(
    query: GetOneTaskQuery,
  ): Promise<Result<GetOneTaskDaoModel, ExceptionBase>> {
    const knex = Model.knex();
    const { id, staffId } = query.params;

    const task: GetOneTaskDaoModel = await knex(`${Tables.TASKS} as t`)
      .select(
        't.*',
        knex.raw(`
        array_agg(jsonb_build_object(
          'isResponsible', ts."isResponsible",
          'isAuthor', ts."isAuthor",
          'isRead', ts."isRead",
          'comment', ts."comment",
          'staff', jsonb_build_object(
            'id', s.id,
            'firstname', s.firstname,
            'lastname', s.lastname,
            'middleName', s."middleName",
            'role', s.role,
            'avatar', s.avatar
          )
        )) as participants
      `),
      )
      .innerJoin(`${Tables.TASKS_STAFF} as ts`, 'ts.taskId', 't.id')
      .innerJoin(`${Tables.STAFF} as s`, 's.id', 'ts.staffId')
      .where('t.id', id)
      .groupBy('t.id')
      .first();

    if (!task.participants.map((p) => p.staff.id).includes(staffId)) {
      return Result.fail(new NotFoundException('Задача не найдена'));
    }

    return Result.ok(task);
  }
}
