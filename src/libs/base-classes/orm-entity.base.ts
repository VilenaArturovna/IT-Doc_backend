export abstract class OrmEntityBase<OrmEntityProps = unknown> {
  public constructor(props?: OrmEntityProps) {
    props && Object.assign(this, props);
  }
}
