import { DateVO, IdVO, UuidVO } from '@libs/value-objects';

export interface EntityBaseProps {
  id?: IdVO;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export interface CreateEntityProps<T> extends EntityBaseProps {
  props: T;
}

export abstract class EntityBase<Props> {
  protected readonly _id: IdVO;
  private readonly _createdAt: DateVO;
  private _updatedAt: DateVO;
  protected readonly props: Props;

  constructor({ id, props, createdAt, updatedAt }: CreateEntityProps<Props>) {
    const now = DateVO.now();
    this._id = id || UuidVO.generate();
    this._createdAt = createdAt ?? now;
    this._updatedAt = updatedAt ?? now;
    this.props = props;
    this.validate();
  }

  public get id(): IdVO {
    return this._id;
  }

  public get createdAt(): DateVO {
    return this._createdAt;
  }

  public get updatedAt(): DateVO {
    return this._updatedAt;
  }

  protected updatedAtNow() {
    this._updatedAt = DateVO.now();
  }

  public getCopiedProps(): Props & EntityBaseProps {
    const copiedProps: Props & EntityBaseProps = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(copiedProps);
  }

  protected abstract validate();
}
