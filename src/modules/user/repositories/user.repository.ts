import {TypeormRepositoryBase} from "@lib/base-classes/typeorm.repository.base";
import {UserEntity} from "../user.entity";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends TypeormRepositoryBase<UserEntity>{
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    super(userRepository);
  }
}
