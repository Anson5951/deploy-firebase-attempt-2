import { UserReturn } from "./UserReturn";

export class User {
  first?: string;
  last?: string;
  born?: number;

  constructor(userReturn?: UserReturn) {
    if(userReturn){
      this.first = userReturn.a;
      this.last = userReturn.x;
      this.born = userReturn.b;
    }
  }


  isOld() {
  }
}
