import { ClientModel, ClientOrmEntityProps } from './client.orm-entity';

export class ClientObjectionOrmEntity extends ClientModel {
  static tableName = 'clients';

  static create(props: ClientOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'phone', 'beneficiary', 'type'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        phone: { type: 'string' },
        beneficiary: { type: 'string' },
        type: { type: 'string' },
        fullName: { type: ['string', 'null'] },
        legalAddress: { type: ['string', 'null'] },
        actualAddress: { type: ['string', 'null'] },
        INN: { type: ['string', 'null'] },
        KPP: { type: ['string', 'null'] },
        OGRN: { type: ['string', 'null'] },
        BIK: { type: ['string', 'null'] },
        paymentAccount: { type: ['string', 'null'] },
        correspondentAccount: { type: ['string', 'null'] },
        directorName: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        contactPerson: { type: ['string', 'null'] },
        contactPersonPhone: { type: ['string', 'null'] },
      },
    };
  }
}
