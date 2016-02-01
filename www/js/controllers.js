angular.module('starter.controllers', [])

.controller('CasasCtrl', function($scope, $http, Casas) {

  $scope.data = {
    search: '',
  }

  $scope.$watch('data.search',function (newValue, oldValue) {
       console.log("Searching");
       if (newValue == '') {}
       else if (newValue != undefined) {
         Casas.refresh($http, newValue, function() {
             $scope.casas = Casas.all();
           });
       }
    });

  $scope.setSearch = function(search) {
      $scope.data.search = search;
    }

})

.controller('CochesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('CasaDetailCtrl', function($scope, $stateParams, Casas) {
  $scope.casa = Casas.get($stateParams.casaId);
})

.controller('EmpleosCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ProductosCtrl', function($scope) {})
