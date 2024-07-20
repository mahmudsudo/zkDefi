# Mina zkApp: Zkdefi

Alright, here's how we can approach this from the perspective of the developer building the protocol:

I. Core Protocol Mechanics Locked In!

Let's get this lending protocol off the ground! Here's a breakdown of the core mechanics I've been working on:

Supported Assets:  For launch, we'll focus on a stablecoin like USDC and Mina's native token (MINA) to ensure stability. We can expand the whitelist later via community governance.  There will also be minimum loan sizes set to avoid gas cost inefficiencies.

Borrowing & Collateral:  We'll implement Loan-to-Value (LTV) ratios to manage risk.  Initially, expect conservative ratios (e.g., 50% for USDC, 30% for MINA) These can be adjusted through governance proposals in the future.

Interest Rates:  To start, we'll use a fixed interest rate model for both lenders and borrowers. This provides predictability during launch. We can explore a hybrid model with variable adjustments later on based on community feedback. Interest earned by lenders will be automatically distributed regularly within the smart contract.

Liquidation:  To protect the protocol, loans will be liquidated if the collateral value falls below a certain threshold (e.g., 80% of loan value). We'll use a Dutch Auction system for liquidation within the smart contract, allowing users to purchase discounted loans. Borrowers facing liquidation can expect a 5% penalty on their collateral.

Risk Management:  We'll use the LTV ratios mentioned earlier and set a minimum Health Factor (e.g., 1.2) to monitor loan health. Loans falling below this threshold will be at risk of liquidation.

This is a solid foundation for our protocol.  We can always refine these parameters as we develop and gather feedback from the community.

## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## License

[Apache-2.0](LICENSE)
