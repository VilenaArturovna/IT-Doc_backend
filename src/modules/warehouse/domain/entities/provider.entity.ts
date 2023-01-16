import { EntityBase } from '@libs/base-classes';
import { IdVO } from '@libs/value-objects';

export interface ProviderEntityProps {
  title: string;
  description?: string;
}

export class ProviderEntity extends EntityBase<ProviderEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: ProviderEntityProps): ProviderEntity {
    return new ProviderEntity({ props });
  }

  public update(props: ProviderEntityProps) {
    this.props.title = props.title;
    this.props.description = props.description;
    this.updatedAtNow();
  }

  protected validate() {}
}
