angular.module('mainCtrl', []).controller('main', function($scope, $http, Player, $timeout) {
    // object to hold all the data for the new player form
    $scope.playerData = {};

    // loading variable to show the spinning loading icon
    $scope.loading = true;

    // GET ALL PLAYERS ==============
    Player.get().then(function (data){
        $scope.players = data.data;
        $scope.loading = false;
    },function (error){
        console.log(error);
    });

    // SAVE A PLAYER ================
    $scope.addPlayer = function() {
        $scope.loading = true;

        Player.save($scope.playerData).then(function (success){
            $scope.message =  successWord() + "! " + $scope.playerData.name + " has been added!";
            $scope.showMessage = true;
            $scope.loading = false;
            $timeout(function() {
                $scope.showMessage = false;
                $scope.playerData.name = null;
            }, 5000);
        },function (error){
            console.log(error);
        });
    };

});

function successWord(){
    var words = ['Great', 'Yea', 'Radical', 'Good', 'Awesome', 'Fantastic',
                      'All right', 'Beautiful', 'Bingo', 'Far out'];
    var rand = Math.floor((Math.random() * 10) + 1);
    return words[rand-1];
}
