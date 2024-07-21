import {
       Field,
       SmartContract,
       state,
       State,
       method,
} from 'o1js';

export class Borrow extends SmartContract {
       @state(Field) num = State<Field>();

       init() {
              super.init();
              this.num.set(Field(3));
       }

}