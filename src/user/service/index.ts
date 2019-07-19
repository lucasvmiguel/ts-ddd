import * as result from "../../utils/result";
import * as repository from "../../repository";

import * as entity from "../entity";


export const getAll = async (params: { repo: repository.Repository<entity.User> }): result.IAsyncResult<entity.User[]> => {
  try {
    const users = await params.repo.find();
    if (!users) {
      return result.fail('not found');
    }

    return result.ok(users);
  } catch (err) {
    return result.fail(err)
  }
}

export const get = async (params: { id: number, repo: repository.Repository<entity.User> }): result.IAsyncResult<entity.User> => {
  try {
    const user = await params.repo.findOne(params.id);
    if (!user) {
      return result.fail('not found');
    }

    return result.ok(user);
  } catch (err) {
    return result.fail(err)
  }
}

export const create = async (params: { user: entity.ICreateUser, repo: repository.Repository<entity.User> }): result.IAsyncResult<entity.User> => {
  try {
    const user = await params.repo.save(params.user);
    if (!user) {
      return result.fail('not created');
    }

    return result.ok(user);
  } catch (err) {
    return result.fail(err)
  }
}