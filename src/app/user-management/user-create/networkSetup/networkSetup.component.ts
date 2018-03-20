import {Component, OnInit, EventEmitter, ViewChild, TemplateRef} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { NetworkSetupService } from "./networkSetup.service";
import { NetworkModel } from '../../../shared/models/network/networkModel';
import { MapService} from "../../../shared/components/map/services/map.service";
import { UserManagementService } from '../../user-management.service';
import {Router} from '@angular/router';
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
  private rows = null;
  isEdit = false;
  selectedNetworkID = 0;
  addressForm: FormGroup;
  public networkModel = {
  networkID: 0,
  name :'',
  address : '',
  address2 :'',
  city:'',
  state:'',
  postalCode:'',
  country:'',
  isActive:true,
  latitude:0,
  longitude:0
  };


  constructor(private fb: FormBuilder, private networkSetupService : NetworkSetupService, private mapService : MapService, private router:Router,  private userManagementService: UserManagementService) {

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
    this.networkFormSetup.addControl(name, formGroup);
  }

  onSubmit() {
    console.log('Submit Add', this.networkFormSetup.get("createNetworkForm").value);

    this.prepareSubmitData(this.networkFormSetup.get("createNetworkForm").value);

    if(this.isEdit) {
      this.networkSetupService.editNetwork(this.networkModel).then(e => {
        //show success message,close pop up
        this.showPopup = false;
        this.isEdit = false;
        this.getNetworkList();
      });
    } else {
      this.networkSetupService.createNetwork(this.networkModel).then(e => {
        //show success message,close pop up
        this.showPopup = false;
        this.getNetworkList();
      });
    }
  }

  showAddressEditModal(selectedRow) {
    console.log(selectedRow);
    this.networkModel.networkID= selectedRow.id;
    this.isEdit = true;

    this.prepoulateEditModal(selectedRow);

    this.showPopup = true;
  }

  prepoulateEditModal(selectedNetwork) {

    console.log('::::network form::', this.networkFormSetup.controls['createNetworkForm']);
    //this.networkFormSetup.value = createObject;
    //this.networkFormSetup.controls["createNetworkForm"].setValue({ name : selectedNetwork.name});
    /*this.addressForm = this.networkFormSetup.controls["createNetworkForm"].value.address;
    console.log(this.addressForm.controls["createNetworkForm"].value.address);
    this.addressForm.controls['country'].setValue(selectedNetwork.country);*/
    /*this.addressForm.value.street = selectedNetwork.address;
    this.addressForm.value.housenumber = selectedNetwork.address2;
    this.addressForm.value.state = selectedNetwork.state;
    this.addressForm.value.zipcode = selectedNetwork.postalcode;*/
  }

  prepareSubmitData(formData) {

    this.networkModel.address = formData.address.street;

    if(formData.address.housenumber !== null) {
      this.networkModel.address2 = formData.address.housenumber;
    }

    this.networkModel.city = formData.address.city;
    this.networkModel.postalCode = formData.address.zipcode;

    if(formData.address.state) {
      this.networkModel.state = formData.address.state;
    }


    this.networkModel.country = formData.address.country;
    this.networkModel.name = formData.name;
    this.networkModel.isActive = true;

    this.mapService.geoCode(formData.address.street+this.networkModel.address2+formData.address.city+formData.address.country).then((geoCoded)=>{

      //if invalid address add error message
      if(geoCoded.results[0]){

        this.networkModel.latitude = geoCoded.results[0].geometry.location.lat;
        this.networkModel.longitude = geoCoded.results[0].geometry.location.lng;

      }
    });
  }

  goToProfile() {
    this.networkSetupService.fetchUserInfo()
      .then(() => {
        console.log('routing to profile', this.userManagementService.getRegistrationData().email);
        localStorage.setItem('currentUser', JSON.stringify({'username': this.userManagementService.getRegistrationData().email}));
        this.router.navigate(['user-profile']);
      });
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
    this.columns.push({ prop: 'city', name: '', cellTemplate: this.editModal});
  }

}
