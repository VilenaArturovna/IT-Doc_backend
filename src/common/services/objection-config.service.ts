import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';
import { Model } from 'objection';

@Injectable()
export class ObjectionConfigService {
  constructor(private readonly configService: ConfigService) {
    const knex = Knex({
      client: 'pg',
      pool: {
        idleTimeoutMillis: 3000,
        reapIntervalMillis: 1000,
      },
      connection: {
        host: this.configService.get<string>('database.postgres.host'),
        port: this.configService.get<number>('database.postgres.port'),
        user: this.configService.get<string>('database.postgres.user'),
        password: this.configService.get<string>('database.postgres.password'),
        database: this.configService.get<string>('database.postgres.database'),
      },
    });

    Model.knex(knex);
  }
}
