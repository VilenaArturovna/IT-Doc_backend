import { Model } from 'objection';

export abstract class ModelBase extends Model {
  id: string;
  createdAt: string;
  updatedAt: string;
}
