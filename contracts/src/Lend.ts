import {
    Field,
    SmartContract,
    state,
    State,
    method,
    MerkleMap,
    Struct,
} from 'o1js';

export class Lend extends SmartContract {
    @state(Field) num = State<Field>();

    init() {
           super.init();
           this.num.set(Field(3));
    }
    @method async update(square: Field) {
             const currentState = this.num.get();
             this.num.requireEquals(currentState);
             square.assertEquals(currentState.mul(currentState));
             this.num.set(square);
           }

}

class Position extends Struct({amount : Field , realized_pnl :Field}){
    
}

