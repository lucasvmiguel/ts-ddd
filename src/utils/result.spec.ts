import * as chai from 'chai';

import * as result from './result';

const resultOk1: result.IResult<number> = {
  isSuccess: true,
  isFailure: false,
  _value: 1,
  _error: undefined,
};

const resultOk2: result.IResult<string> = {
  isSuccess: true,
  isFailure: false,
  _value: 'test',
  _error: undefined,
};

const resultOkEmpty: result.IResult<string> = {
  isSuccess: true,
  isFailure: false,
  _value: undefined,
  _error: undefined,
};

const resultFail1: result.IResult<any> = {
  isSuccess: false,
  isFailure: true,
  _value: undefined,
  _error: new Error('test 1'),
};

const resultFail2: result.IResult<any> = {
  isSuccess: false,
  isFailure: true,
  _value: undefined,
  _error: new Error('test 2'),
};

const resultFailEmpty: result.IResult<any> = {
  isSuccess: false,
  isFailure: true,
  _value: undefined,
  _error: new Error(),
};

describe('result util', () => {
  it('ok', () => {
    const tests = [
      {
        params: 1,
        expected: resultOk1,
      },
      {
        params: 'test',
        expected: resultOk2,
      },
      {
        params: undefined,
        expected: resultOkEmpty,
      },
    ];

    tests.map(t => chai.expect(result.ok(t.params)).to.be.deep.equal(t.expected));
  });

  it('fail', () => {
    const tests = [
      {
        params: undefined,
        expected: resultFailEmpty,
      },
      {
        params: 'test 1',
        expected: resultFail1,
      },
      {
        params: new Error('test 2'),
        expected: resultFail2,
      },
    ];

    tests.map(t => chai.expect(result.fail(t.params).isSuccess).to.be.deep.equal(t.expected.isSuccess));
    tests.map(t => chai.expect(result.fail(t.params).isFailure).to.be.deep.equal(t.expected.isFailure));
    tests.map(t => chai.expect(result.fail(t.params)._value).to.be.deep.equal(t.expected._value));
    tests.map(t => chai.expect(result.fail(t.params)._error.message).to.be.deep.equal(t.expected._error.message));
  });

  it('value', () => {
    const tests = [
      {
        expected: 1,
        params: resultOk1,
      },
      {
        expected: 'test',
        params: resultOk2,
      },
      {
        expected: undefined,
        params: resultOkEmpty,
      },
    ];

    // @ts-ignore
    tests.map(t => chai.expect(result.value(t.params)).to.be.deep.equal(t.expected));
  });

  it('value with invalid', () => {
    const tests = [
      {
        expected: 'InvalidOperation: A result cannot be found when the result is not successful',
        params: resultFail1,
      },
    ];

    tests.map((t) => {
      try {
        result.value(t.params);
      } catch (error) {
        chai.expect(error.message).to.be.deep.equal(t.expected);
      }
    });
  });

  it('error', () => {
    const tests = [
      {
        expected: new Error(),
        params: resultFailEmpty,
      },
      {
        expected: new Error('test 1'),
        params: resultFail1,
      },
      {
        expected: new Error('test 2'),
        params: resultFail2,
      },
    ];

    tests.map(t => chai.expect(result.error(t.params).message).to.be.deep.equal(t.expected.message));
  });

  it('error with invalid', () => {
    const tests = [
      {
        expected: 'InvalidOperation: An error cannot be found when the result is successful',
        params: resultOk1,
      },
    ];

    tests.map((t) => {
      try {
        result.error(t.params);
      } catch (error) {
        chai.expect(error.message).to.be.deep.equal(t.expected);
      }
    });
  });

  it('combineErrors', () => {
    const tests = [
      {
        expected: new Error('test 1 | test 2 | '),
        params: [resultFail1, resultOk1, resultFail2],
      },
    ];

    tests.map(t => chai.expect(result.combineErrors(...t.params).message).to.be.deep.equal(t.expected.message));
  });

  it('checkSuccess', () => {
    const tests = [
      {
        expected: true,
        params: [resultOk1, resultOk2],
      },
      {
        expected: false,
        params: [resultOk1, resultFail1],
      },
      {
        expected: true,
        params: [],
      },
    ];

    tests.map(t => chai.expect(result.checkSuccess(...t.params)).to.be.deep.equal(t.expected));
  });

  it('checkFailure', () => {
    const tests = [
      {
        expected: false,
        params: [resultOk1, resultOk2],
      },
      {
        expected: true,
        params: [resultOk1, resultFail1],
      },
      {
        expected: false,
        params: [],
      },
    ];

    tests.map(t => chai.expect(result.checkFailure(...t.params)).to.be.deep.equal(t.expected));
  });
});
