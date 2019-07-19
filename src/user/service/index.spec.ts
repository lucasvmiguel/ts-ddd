import * as chai from 'chai';

import * as result from "../../utils/result";

import * as service from './';
import * as mock from '../test/mock';


describe('user service', () => {
  it('get', done => {
    const tests = [
      {
        params: {
          id: 1,
          repo: { findOne: id => Promise.resolve(mock.user1) }
        },
        expected: result.ok(mock.user1),
      },
    ];

    tests.map(t => {
      // @ts-ignore
      service.get(t.params).then(r => {
        chai.expect(r).to.be.deep.equal(t.expected)
        done();
      });
    });
  });
});
