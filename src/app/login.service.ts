import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {
  private isLoggedin = false;

  constructor() {
  }
  setLoggedin( val: boolean){
    this.isLoggedin = val;
  }

  get isLoggedStatus(){
    return this.isLoggedin;
  }

}
