import { DashboardService } from "./services/dashboard.service";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class AbstractDashboardBase {

  constructor(){
  console.log(':::::AbstractDashboardBase::::::');
  }

}



