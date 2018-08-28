"use strict"

const accessories = {
  template: `
  <button ng-click="$ctrl.getAcc();">Get Accessories</button>
  <form ng-submit="$ctrl.postAcc($ctrl.newAccessories);">
    <input type="text" ng-model="$ctrl.newAccessories.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newAccessories.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newAccessories.color" placeholder="Color">
    <input type="text" ng-model="$ctrl.newAccessories.price" placeholder="Price">
    <button>Add An Accessory</button>
  </form>
  <!-- ngReeating each of the objects in the array and tracking them by the index -->
  <p ng-repeat="item in $ctrl.accList track by $index">{{ item }}
  <input type="text" ng-model="item.brand" placeholder="Brand">
  <input type="text" ng-model="item.type" placeholder="Type">
  <input type="text" ng-model="item.size" placeholder="Size">
  <input type="text" ng-model="item.color" placeholder="Color">
  <input type="text" ng-model="item.price" placeholder="Price">
  <button ng-click="$ctrl.updateAcc(item.id, item);">Update</button>
  <button ng-click="$ctrl.deleteAcc(item.id);">X</button>
  </p>
  
  `, 
  // Injeection the http service in the controller
  controller: function($http) {
    const vm = this;

    // This function calls to the api and gets the data that is in the api
    vm.getAcc = () => {
      $http({
        url: "/api/shop/accessories",
        method: "GET"
      }).then((response) => {
        vm.accList = response.data;
      })
    };
    // This function updates the item that is in the array and sends it to the api based on the id number
    vm.updateAcc = (id, newAcc) => {
        $http({
            url:"/api/shop/accessories/"+ id,
            method:"PUT",
            data: newAcc         
        }).then((response) => {
            vm.accList = response.data;
        });
    };
    // This function adds a new object to the array 
    vm.postAcc = (newAcc) => {
        $http({
            url:"/api/shop/accessories/",
            method:"POST",
            data: newAcc
        }).then((response)=> {
            vm.accList = response.data;            
        });
    };
    // This function deletes an object in the array based on the id number
    vm.deleteAcc = (id) => {
      $http({
        url: `/api/shop/accessories/${id}`,
        method: "DELETE"                
      }).then((response) => {
        vm.accList = response.data;
      });
    }
  }
}

angular.module("App").component("accessories", accessories);