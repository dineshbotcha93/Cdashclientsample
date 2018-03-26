import { DashboardService } from "./services/dashboard.service";
import {Injectable, OnInit} from "@angular/core";

@Injectable()
export abstract class AbstractDashboardBase implements OnInit {

  constructor(){
  console.log(':::::AbstractDashboardBase::::::');
  }

  ngOnInit() {

    this.isAdminUser();
  }

  isAdminUser() {
    if(localStorage.getItem('com.cdashboard.userInfoObject')) {

      let user = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));

      return user.admin;
    }

    // add logic to call userinfo api to get the user object if its not in localstorage
    return false;
}
}



