// src/app/registration/registration.component.ts
import { Component, OnInit } from "@angular/core";
import gql from "graphql-tag";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Apollo} from "apollo-angular";

class CarModel {
  constructor(
    public modelName: string = '',
    public vendorId: string = '',
    public id?: string,
  ) {}
}

@Component({
  selector: "app-car-vendor",
  templateUrl: "./car-model.component.html",
})
export class CarModelComponent implements OnInit {
  // It maintains list of Registrations
  models: Array<CarModel> = [];
  // It maintains registration Model
  model: CarModel;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = "Save";
  // It maintains table row index based on selection.
  
  constructor(private apollo: Apollo) {}
  
  ngOnInit() {
    this.displayModels();
  }
  
  // Get all registrations
  displayModels() {
    const getModels = gql`
      {
        CarModels {
          id
          vendor {
            id
            vendorName
          }
          modelName
        }
      }
    `;
    
    this.apollo
      .watchQuery({
        query: getModels,
        fetchPolicy: "network-only"
      })
      .valueChanges.map((result: any) => {
        return result.data.CarModels;
      })
      .subscribe(data => {
        this.models = data;
      });
  }
  
  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.model = new CarModel();
    // Change submitType to 'Save'.
    this.submitType = "Save";
    // display registration entry section.
    this.showNew = true;
  }
  
/*  // This method associate to Save Button.
  onSave() {
    
    if (this.submitType === "Save") {
      const saveCarVendor = gql`
        mutation createVendor(
          $vendorName: String!
        ) {
          createVendor(
            vendorName: $vendorName
          ) {
            id
          }
        }
      `;
      this.apollo
        .mutate({
          mutation: saveCarVendor,
          variables: {
            vendorName: this.vendorModel.vendorName,
          }
        })
        .subscribe(
          ({ data }) => {
            this.displayModels();
          },
          error => {
            console.log("there was an error sending the query", error);
          }
        );
      
      // Push registration model object into registration list.
      // this.registrations.push(this.regModel);
    } else {
      const updateVendor = gql`
        mutation updateVendor(
          $id: ID!
          $vendorName: String!
        ) {
          updateVendor(
            id: $id
            vendorName: $vendorName
          ) {
            id
          }
        }
      `;
      this.apollo
        .mutate({
          mutation: updateVendor,
          variables: {
            id: this.vendorModel.id,
            vendorName: this.vendorModel.vendorName,
          }
        })
        .subscribe(
          ({ data }) => {
            console.log("got editdata", data);
            this.displayModels();
          },
          error => {
            console.log("there was an error sending the query", error);
          }
        );
    }
    // Hide registration entry section.
    this.showNew = false;
  }
  
  // This method associate to Edit Button.
  onEdit(vendor: CarVendor) {
    // Initiate new registration.
    this.vendorModel = new CarVendor();
    // Retrieve selected registration from list and assign to model.
    this.vendorModel = Object.assign({}, vendor);
    
    // Change submitType to Update.
    this.submitType = "Update";
    // Display registration entry section.
    this.showNew = true;
  }
  
  // This method associate to Delete Button.
  onDelete(index: number) {
    const deleteVendor = gql`
      mutation deleteVendor($id: ID!) {
        deleteVendor(id: $id) {
          id
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: deleteVendor,
        variables: {
          id: index + 1
        }
      })
      .subscribe(
        ({ data }) => {
          console.log("got editdata", data);
          this.displayModels();
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
  }
  */
  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }
}
