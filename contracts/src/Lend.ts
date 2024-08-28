import { Field, Mina, PrivateKey, AccountUpdate, UInt64, UInt32, Permissions } from 'o1js';

class LendingPool {
  constructor(oracle, tokenContract) {
    this.oracle = oracle;
    this.tokenContract = tokenContract;
    this.state = {
      totalDeposits: UInt64.zero,
      totalLoans: UInt64.zero,
      userStates: new Map(),
    };
  }

  deposit(user, amount) {
    const userState = this.state.userStates.get(user.publicKey);
    if (!userState) {
      userState = {
        depositBalance: UInt64.zero,
        loanBalance: UInt64.zero,
        collateral: UInt64.zero,
      };
      this.state.userStates.set(user.publicKey, userState);
    }

    userState.depositBalance = userState.depositBalance.add(amount);
    this.state.totalDeposits = this.state.totalDeposits.add(amount);

    this.tokenContract.transfer(user.publicKey, this.publicKey, amount);
  }

  withdraw(user, amount) {
    const userState = this.state.userStates.get(user.publicKey);
    if (!userState || userState.depositBalance.sub(amount).lt(UInt64.zero)) {
      // Handle insufficient balance
      return;
    }

    userState.depositBalance = userState.depositBalance.sub(amount);
    this.state.totalDeposits = this.state.totalDeposits.sub(amount);

    this.tokenContract.transfer(this.publicKey, user.publicKey, amount);
  }

  borrow(user, amount, collateral) {
    const userState = this.state.userStates.get(user.publicKey);
    if (!userState) {
      userState = {
        depositBalance: UInt64.zero,
        loanBalance: UInt64.zero,
        collateral: UInt64.zero,
      };
      this.state.userStates.set(user.publicKey, userState);
    }

    // Check collateral value
    const collateralValue = this.oracle.getPrice(collateralToken);
    if (collateralValue.mul(collateral).lt(amount.mul(this.collateralFactor))) {
      // Handle insufficient collateral
      return;
    }

    userState.loanBalance = userState.loanBalance.add(amount);
    userState.collateral = userState.collateral.add(collateral);
    this.state.totalLoans = this.state.totalLoans.add(amount);

    this.tokenContract.transfer(this.publicKey, user.publicKey, amount);
  }

  repay(user, amount) {
    const userState = this.state.userStates.get(user.publicKey);
    if (!userState || userState.loanBalance.sub(amount).lt(UInt64.zero)) {
      // Handle insufficient loan balance
      return;
    }

    userState.loanBalance = userState.loanBalance.sub(amount);
    this.state.totalLoans = this.state.totalLoans.sub(amount);

    this.tokenContract.transfer(user.publicKey, this.publicKey, amount);
  }

  liquidate(borrower) {
    const userState = this.state.userStates.get(borrower.publicKey);
    if (!userState || !this.isUndercollateralized(userState)) {
      
      return;
    }

   

  isUndercollateralized(userState) {
    const collateralValue = this.oracle.getPrice(userState.collateralToken);
    return collateralValue.mul(userState.collateral).lt(userState.loanBalance.mul(this.collateralFactor));
  }
}