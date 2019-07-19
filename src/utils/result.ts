export interface IResult<T> {
  isSuccess: boolean;
  isFailure: boolean;
  _error?: Error;
  _value?: T;
}

export type IAsyncResult<R> = Promise<IResult<R>>;

export const ok = <T>(value?: T): IResult<T> => {
  return {
    isSuccess: true,
    isFailure: false,
    _value: value,
    _error: undefined,
  };
};

export const fail = <T>(error?: Error | string): IResult<T> => {
  const err = error instanceof Error ? error : new Error(error);

  return {
    isSuccess: false,
    isFailure: true,
    _error: err,
    _value: undefined,
  };
};

export const value = <T>(result: IResult<T>): T => {
  if (result.isSuccess) {
    return result._value;
  }

  throw new Error('InvalidOperation: A result cannot be found when the result is not successful');
};

export const error = <T>(result: IResult<T>): Error => {
  if (result.isFailure) {
    return result._error;
  }

  throw new Error('InvalidOperation: An error cannot be found when the result is successful');
};

export const combineErrors = (...results: IResult<any>[]): Error => {
  const err = new Error();

  for (const result of results) {
    if (result.isFailure) {
      const e = error(result);

      err.name += `${e.name} | `;
      err.message += `${e.message} | `;
      err.stack += `${e.stack} | `;
    }
  }

  return err;
};

export const checkSuccess = (...results: IResult<any>[]): boolean => {
  for (const result of results) {
    if (result.isFailure) {
      return false;
    }
  }

  return true;
};

export const checkFailure = (...results: IResult<any>[]): boolean => {
  for (const result of results) {
    if (result.isFailure) {
      return true;
    }
  }

  return false;
};
