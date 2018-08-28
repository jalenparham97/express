"use strict"
const clothes = {
  template: `
  <button ng-click="$ctrl.getClothes();">Get Clothes</button>
  <form ng-submit="$ctrl.postClothes($ctrl.newCloth);">
    <input type="text" ng-model="$ctrl.newCloth.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newCloth.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newCloth.size" placeholder="Size">
    <input type="text" ng-model="$ctrl.newCloth.color" placeholder="Color">
    <input type="text" ng-model="$ctrl.newCloth.price" placeholder="Price">
    <button>Add A Piece of Clothing</button>
  </form>
  <p ng-repeat="item in $ctrl.clothesList track by $index">{{ item }}
  <input type="text" ng-model="item.brand" placeholder="Brand">
  <input type="text" ng-model="item.type" placeholder="Type">
  <input type="text" ng-model="item.size" placeholder="Size">
  <input type="text" ng-model="item.color" placeholder="Color">
  <input type="text" ng-model="item.price" placeholder="Price">
  <button ng-click="$ctrl.updateClothes(item.id, item);">Update</button>
  <button ng-click="$ctrl.deleteClothes(item.id);">X</button>
  </p>
  
  `, 
  controller: function($http) {
    const vm = this;

    vm.getClothes = () => {
      $http({
        url: "/api/shop/clothes",
        method: "GET"
      }).then((response) => {
        vm.clothesList = response.data;
      })
    };
    vm.updateClothes = (id, newClothes) => {
        $http({
            url:"/api/shop/clothes/"+ id,
            method:"PUT",
            data: newClothes         
        }).then((response) => {
            vm.clothesList = response.data;
        });
    };
    vm.postClothes = (newClothes) => {
        $http({
            url:"/api/shop/clothes/",
            method:"POST",
            data: newClothes
        }).then((response)=> {
            vm.clothesList = response.data;            
        });
    };
    vm.deleteClothes = (id) => {
      $http({
        url: `/api/shop/clothes/${id}`,
        method: "DELETE"
      }).then((response) => {
        vm.clothesList = response.data;
      });
    }
  }
}

angular.module("App").component("clothes", clothes);