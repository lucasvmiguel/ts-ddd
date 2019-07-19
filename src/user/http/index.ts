import * as repository from "../../repository";
import * as http from "../../http";
import * as result from "../../utils/result";

import * as entity from '../entity';
import * as service from '../service';

export const getAll = (repo: repository.Repository<entity.User>): http.IHandlerFn => async req => {
  const userOrError = await service.getAll({ repo });
  if (userOrError.isFailure) {
    return {
      status: http.Status.NotFound,
      body: {
        message: 'Users not found',
        error: result.error(userOrError),
      }
    };
  }


  return {
    status: http.Status.Success,
    body: {
      message: 'Users found',
      data: result.value(userOrError),
    }
  };
}

export const get = (repo: repository.Repository<entity.User>): http.IHandlerFn => async req => {
  const userOrError = await service.get({ repo, id: +req.params.id });
  if (userOrError.isFailure) {
    return {
      status: http.Status.NotFound,
      body: {
        message: 'User not found',
        error: result.error(userOrError),
      }
    };
  }


  return {
    status: http.Status.Success,
    body: {
      message: 'User found',
      data: result.value(userOrError),
    }
  };
}

export const create = (repo: repository.Repository<entity.User>): http.IHandlerFn => async req => {
  const userOrError = await service.create({ repo, user: req.body });
  if (userOrError.isFailure) {
    return {
      status: http.Status.NotFound,
      body: {
        message: 'User not created',
        error: result.error(userOrError),
      }
    };
  }


  return {
    status: http.Status.Success,
    body: {
      message: 'User created',
      data: result.value(userOrError),
    }
  };
}