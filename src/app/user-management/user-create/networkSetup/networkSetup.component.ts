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
  cancelTitle = 'Cancel';
  showEditPopup = false;
  modalMessage ='';
  disableSubmitButton = true;
  @ViewChild('editModal') editModal: TemplateRef<any>;
  public rows = null;
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
  latestCoordinates: any = null;


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

  public addFormControl(name: string, formGroup: FormGroup) : void {
    this.networkFormSetup.addControl(name, formGroup);
  }

  onSubmit(type: any = null) {
    console.log('Submit Add', this.networkFormSetup.get("createNetworkForm").value);

    this.prepareSubmitData(this.networkFormSetup.get("createNetworkForm").value);

    if(this.isEdit) {
      console.log("hereee");
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
    console.log(selectedNetwork);
    const populatedData = {
      name: selectedNetwork.title,
      address:{
        street: selectedNetwork.address,
        housenumber:selectedNetwork.address2,
        city: selectedNetwork.city,
        zipcode: selectedNetwork.postalCode,
        state: selectedNetwork.state,
        country: selectedNetwork.country
      },
      isActive:true
    }
    this.networkFormSetup.setValue({createNetworkForm:populatedData});
  }

  capturedCoordinates($event){
    this.latestCoordinates = $event;
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
    this.networkModel.latitude = this.latestCoordinates.latitude;
    this.networkModel.longitude = this.latestCoordinates.longitude;
  }



  goToProfile() {
    this.networkSetupService.fetchUserInfo()
      .then((response) => {
        //console.log('routing to profile', this.userManagementService.getRegistrationData().email);
      //  localStorage.setItem('currentUser', JSON.stringify({'username': this.userManagementService.getRegistrationData().email}));
      localStorage.setItem('currentUser', JSON.stringify({'username': response.email}));
      localStorage.setItem('com.cdashboard.userInfoObject', JSON.stringify(response));
        this.router.navigate(['user-profile']);
      });
  }
  addNetwork() {
    this.networkFormSetup.reset();
    this.showPopup = true;
  }

  modalClosed(event) {
    console.log(event);
    this.showPopup = false;
  }

  copyAccountAddress() {
    this.networkSetupService.fetchUserInfo()
      .then((response) => {
        console.log('response', this.networkFormSetup);
        const accountDetails = response.account[0];

        const populatedData = {
          name: '',
          address: {
            street: accountDetails.address,
            housenumber: accountDetails.address2,
            city: accountDetails.city,
            zipcode: accountDetails.postalCode,
            state: accountDetails.state,
            country: accountDetails.country
          },
          isActive: true
        };
        this.networkFormSetup.setValue({createNetworkForm: populatedData});
        /*this.networkFormSetup.address2 = accountDetails.address2;
        this.networkFormSetup.city = accountDetails.city;
        this.networkFormSetup.country = accountDetails.country;
        this.networkFormSetup.state = accountDetails.state;
        this.networkFormSetup.postalCode = accountDetails.postalCode;
        this.networkFormSetup.latitude = accountDetails.latitude;
        this.networkFormSetup.longitude = accountDetails.longitude;*/
      });
  }

  private prepareDataTableColumns() {
    this.columns.push({ prop: 'title', name: 'Network Name'});
    this.columns.push({ prop: 'city', name: 'City', cellTemplate: this.editModal});
  }

  public enableSubmit($event){
    console.log("caught enable");
    this.disableSubmitButton = !$event;
    console.log($event);
  }

}
