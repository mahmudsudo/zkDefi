import {
       Field,
       SmartContract,
       state,
       State,
       method,
       Struct,
       MerkleMap,TokenContractV2,UInt64
} from 'o1js';

export class Borrow extends SmartContract {
      

       init() {
              super.init();
              
       }

       // supports Mina/Usdt at the mvp stage
       @method async depositCollateral( asset :TokenContractV2,  amount :UInt64)  {
           asset.internal.send({from : this.sender.self.address,to :this.address,  amount})
       
          }
          @method async borrow(){
          
          }
}

// address borrowAsset;
// address collateralAsset;
// uint256 borrowAmount;
// uint256 collateralAmount;
// uint256 returnAmount;
// uint256 returDateTimestamp;
class BorrowInfo extends Struct({ 
       borrowAsset: Field, 
       collateralAsset: Field,
        borrowAmount: Field, 
        collateralAmount: Field, 
        returnAmount: Field, 
        returDateTimestamp: Field }) {

}

