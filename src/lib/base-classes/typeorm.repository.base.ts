import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {DeepPartial} from "typeorm/common/DeepPartial";

export abstract class TypeormRepositoryBase<Entity> {
  protected constructor(protected readonly repository: Repository<Entity>) {}

  async findOneById(id: string): Promise<Entity> {
    return await this.repository.findOne(id)
  }

  async findOneOrThrow(params: any): Promise<Entity> {
    try {
      return await this.repository.findOneOrFail({where: params})
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async findOne(params: any): Promise<Entity> {
    return await this.repository.findOne({where: params})
  }

  async findMany(params: any): Promise<Entity[]> {
    return await this.repository.find({where: params})
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity> {
    return await this.repository.save(entity)
  }

  async removeOne(entity: Entity):Promise<Entity> {
    return await this.repository.remove(entity);
  }
}
