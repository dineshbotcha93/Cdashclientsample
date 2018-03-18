import {Component, OnInit, EventEmitter, ViewChild, TemplateRef} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { NetworkSetupService } from "./networkSetup.service";
import { NetworkModel } from '../../../shared/models/network/networkModel';
import { MapService} from "../../../shared/components/map/services/map.service";

@Component({
  selector: 'network-setup',
  templateUrl: './networkSetup.component.html',
  providers: [ NetworkSetupService, MapService ]
})
export class NetworkSetupComponent implements OnInit {


  public networkFormSetup: FormGroup;
  selectedStep: number;
  private columns: Array<any> = [];
  private limit: number = 10;
  public items: Array<any> = null;
  showPopup = false;
  showEditPopup = false;
  modalMessage ='';
  @ViewChild('editModal') editModal: TemplateRef<any>;
  private rows = [];
  private networkModel: NetworkModel;


  constructor(private fb: FormBuilder, private networkSetupService : NetworkSetupService, private mapService : MapService) {

    this.selectedStep = 3;

    this.networkFormSetup = this.fb.group({

    });

    this.getNetworkList();
    this.mapService = this.mapService;
  }

  private getNetworkList() {
    this.networkSetupService.getNetworkList().then((res)=>{

      this.rows = res;
      console.log('network list:::', res);
      /*res.forEach((rResult)=>{

        this.rows.push({
          title:rResult.title,
          address:rResult.address+ ' ' + rResult.address2 + ' ' + rResult.city
        });

      });*/
      return res;
    }).then((real) => {

    });
  }

  ngOnInit(): void {


    this.prepareDataTableColumns();

  }

  private addFormControl(name: string, formGroup: FormGroup) : void {
    console.log(':::::: network setup form:::' ,name);
    this.networkFormSetup.addControl(name, formGroup);
  }

  onSubmitEdit() {
    console.log('Submit Edit', this.networkFormSetup.value);
    this.showPopup = false;
  }

  onSubmit( action ) {
    console.log('::::::Action:::::', action);
    console.log('Submit Add', this.networkFormSetup.value);

    this.preparePostData();

    if(action==='add') {
      this.networkSetupService.createNetwork(this.networkModel).then(e => {

        //show success message,close pop up
        this.showPopup = false;
      });
    } else {
      console.log('::::EDIT::::');
    }

  }

  preparePostData() {

    this.networkModel.address = this.networkFormSetup.get("street").value;
    this.networkModel.address2 = this.networkFormSetup.get("housenumber").value;
    this.networkModel.city = this.networkFormSetup.get("city").value;
    this.networkModel.postalCode = this.networkFormSetup.get("zipcode").value;
    this.networkModel.state = this.networkFormSetup.get("state").value;
    this.networkModel.country = this.networkFormSetup.get("country").value;
    this.networkModel.name = this.networkFormSetup.get("name").value;
    this.networkModel.isActive = true;

    this.mapService.geoCode(this.networkFormSetup.get("street").value+this.networkFormSetup.get("city").value+this.networkFormSetup.get("country").value).then((geoCoded)=>{
      if(geoCoded.results[0]){

        this.networkModel.latitude = geoCoded.results[0].geometry.location.lat;
        this.networkModel.longitude = geoCoded.results[0].geometry.location.lng;

      }
    });
  }


  showAddressModal(row) {
    console.log('::::::::::::', row);
    this.showPopup = true;
    this.modalMessage = row;
  }

  showAddressEditModal(row) {
    this.showEditPopup = true;
  }

  editModalClosed(event) {
    console.log(event);
    this.showEditPopup = false;
  }

  addNetwork(){
    this.showPopup = true;
  }

  modalClosed(event) {
    console.log(event);
    this.showPopup = false;
  }

  private prepareDataTableColumns() {
    this.columns.push({ prop: 'title', name: 'Network Name'});
    this.columns.push({ prop: 'city', name: 'Address', cellTemplate: this.editModal});
  }

}
