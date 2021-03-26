(function () {
  "use strict";
  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "./loader/itemsloaderindicator.template.html",
      scope: {
        items: "<",
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.found = [];
    narrow.searchTerm = "";
    narrow.foundItems = function () {
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
      narrow.found = MenuSearchService.getFound();
    }
    narrow.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http) {
    var service = this;
    service.foundItems = [];
    
    service.getFound = function() {
      return service.foundItems;
    }
    service.getMatchedMenuItems = function (searchTerm) {
      service.foundItems = [];
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      }).then(function (result) {
        // process result and only keep items that match
        var allData = result.data.menu_items;
        for (var i = 0; i < allData.length; i++) {
          var description = allData[i].description;
          if (
            description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          ) {
            service.foundItems.push(allData[i]);
          }
        }
      });
    };

    service.removeItem = function (itemIndex) {
      service.foundItems.splice(itemIndex, 1);
    };
    
  }
})();
