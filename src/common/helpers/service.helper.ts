import { ObjectId } from 'mongodb';
import { Repository, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IWhereName } from '../interfaces/where-name.interface';
import { IWhereIds } from '../interfaces/where-ids.interface';
import { findOrder } from '../types/find-order.type';
import { FindNameDto } from '../dto/find-name.dto';

@Injectable()
export class ServiceHelper {
  async getUpsertData(fields: any, repository: Repository<any>): Promise<any> {

    return repository.create(fields);
  }

  getWhereByName(name: string | undefined): IWhereName {
    const where: IWhereName = {
      active: true,
    };

    if (name) {
      where.name = Like("%" + name + "%");
    }

    return where;
  }

  getWhereByIds(ids: number[]): IWhereIds {
    const $where: IWhereIds = {
      id: { $in: ids.map((mongoId: number): number => mongoId) },
      active: true,
    };

    return $where;
  }

  async findAllByNameOrIds(dto: FindNameDto, repository: Repository<any>): Promise<any> {
    const { skip, take, ids, name, order, fieldSort }: FindNameDto = dto;
    const $order: findOrder = { [fieldSort]: order };
    const $where: IWhereName | IWhereIds = ids ? this.getWhereByIds(ids) : this.getWhereByName(name);

    console.log($where, 111)
    const [result, count]: [any[], any[]] = await Promise.all([
      repository.find({
        skip,
        take,
        where: $where,
        order: $order,
      }),
      repository.find({
        where: $where,
      }),
    ]);

    return {
      items: result,
      total: count.length,
    };
  }
}
