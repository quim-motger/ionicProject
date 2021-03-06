angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Casas', function() {

  var casas = [];

    return {
      all: function() {
        console.log("Data succesfully checked");
        return casas;
      },
      remove: function(casa) {
        casas.splice(casas.indexOf(casa), 1);
      },
      get: function(casaId) {
        for (var i = 0; i < casas.length; i++) {
          if (casas[i].id === parseInt(casaId)) {
            return casas[i];
          }
        }
        return null;
      },
      refresh: function($http, search, callback) {
        $http({
        url : "http://api.trovit.com/v2/homes/ads",
        method : 'GET',
        headers : {
          'X-Client-Id': 'udlud5coydqmdb7eksx97gz65gfoovsw'
        },
        params : {
          'country': 'es',
          'what': search,
          'per_page': '50'
        }
        }).then(function successCallback(response){
          casas = [];
          var ads = response.data['ads'];
          var n = 0;
          var max = response.data['total_ads'];
          if (max > 50) max = 50;
          while (n < max) {
            var entry = ads[n];
            var low;
            var high;
            if (entry != undefined) {
              if (entry['photos'] != undefined) {
                low = entry['photos']['low']['url'];
                high = entry['photos']['high']['url'];
              } else {
                low = 'http://www.tresequipos.es/img/p/img/img_not_found.gif';
                high = 'http://www.tresequipos.es/img/p/img/img_not_found.gif';
              }

              var casa = {
                id: n,
                title: entry['title'],
                description: entry['description'],
                img: low,
                img_high: high,
                n_hab: entry['rooms'],
                precio: entry['price']
              }
              casas.push(casa);
              n++;
            }
          }
          console.log("Data succesfully stored");
          callback();
        }, function errorCallback(response){
        });
      }
    };

})
