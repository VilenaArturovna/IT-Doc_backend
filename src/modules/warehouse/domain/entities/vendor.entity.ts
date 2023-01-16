import { EntityBase } from '@libs/base-classes';
import { IdVO } from '@libs/value-objects';

export interface VendorEntityProps {
  title: string;
  description?: string;
}

export class VendorEntity extends EntityBase<VendorEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: VendorEntityProps): VendorEntity {
    return new VendorEntity({ props });
  }

  public update(props: VendorEntityProps) {
    this.props.title = props.title;
    this.props.description = props.description;
    this.updatedAtNow();
  }

  protected validate() {}
}
