(function () {
  "use strict";
  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.hasItem =  function () {
      if(toBuy.items.length === 0) { 
        return false;
      }
      return true;
    }
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buyItem = function (itemName, itemQuantity, itemIndex) {
      ShoppingListCheckOffService.buyItem(itemName, itemQuantity, itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.hasItem =  function () {
      if(bought.items.length === 0) { 
        return false;
      }
      return true;
    }
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    //item
    var toBuy = [
      {name: "cookies", quantity: 10},
      {name: "water", quantity: 5},
      {name: "breads", quantity: 7},
      {name: "snacks", quantity: 18},
      {name: "juice", quantity: 2}
    ];
    var bought = [];

    service.getToBuyItems = function () {
      return toBuy;
    };

    service.getBoughtItems = function () {
      return bought;
    };

    service.buyItem = function (itemName, itemQuantity, itemIndex) {
      var item = {
        name: itemName,
        quantity: itemQuantity,
      };
      try {
        toBuy.splice(itemIndex, 1); //remove in to buy
        bought.push(item); // add to bought
      } catch (error) {
        console.log("Cannot buy this item. Something wrong.", error);
      }
    };
  }
})();
