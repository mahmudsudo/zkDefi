// import { LendingPool } from './LendingPool';

mport { assert } from 'chai';
import LendingPool from './LendingPool';

describe('LendingPool', () => {
  let lendingPool;

  beforeEach(() => {
    lendingPool = new LendingPool();
  });

  it('should calculate interest correctly', () => {
    const principal = 100;
    const interestRate = 0.05;
    const time = 1;

    const expectedInterest = principal * interestRate * time;
    const actualInterest = lendingPool.calculateInterest(principal, interestRate, time);

    assert.equal(actualInterest, expectedInterest);
  });

  // ... other unit tests
});