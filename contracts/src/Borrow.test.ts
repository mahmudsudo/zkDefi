import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  Signature
} from 'o1js';
import { LendingBorrowing } from './Borrow';

(async () => {
  await isReady;

  // Initialize the Mina local blockchain
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const { privateKey: senderKey, publicKey: sender } = Local.testAccounts[0];
  const { privateKey: receiverKey, publicKey: receiver } = Local.testAccounts[1];

  // Deploy the contract
  const contractKey = PrivateKey.random();
  const contract = new LendingBorrowing(contractKey.toPublicKey());
  await contract.deploy();

  // Deposit liquidity
  await contract.depositLiquidity(Field(100));

  // Borrow funds
  const borrowAmount = Field(50);
  const collateral = Field(75);
  const borrowSignature = Signature.create(senderKey, Poseidon.hash([borrowAmount, collateral]));
  await contract.borrowFunds(borrowAmount, collateral, sender, borrowSignature);

  // Repay funds
  const repayAmount = Field(50);
  const repaySignature = Signature.create(senderKey, Poseidon.hash([repayAmount]));
  await contract.repayFunds(repayAmount, sender, repaySignature);

  // Withdraw liquidity
  const withdrawAmount = Field(50);
  const withdrawSignature = Signature.create(receiverKey, Poseidon.hash([withdrawAmount]));
  await contract.withdrawLiquidity(withdrawAmount, receiver, withdrawSignature);

  // Shutdown the Mina instance
  shutdown();
})();
