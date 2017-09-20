angular.module('playerService', []).factory('Player', function($http) {

    return {
        // get all the players
        get : function() {
            return $http.get('/api/players');
        },

        // save a player
        save : function(playerData) {
            return $http({
                method: 'POST',
                url: '/api/players',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: queryParams(playerData)
            });
        }

    };

});

function queryParams(source) {
  var array = [];

  for(var key in source) {
     array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
  }

  return array.join("&");
}
