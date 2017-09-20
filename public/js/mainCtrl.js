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

    // RECORD STUFF ==============
    $scope.start = false;

    $scope.setPlayer = function(e, player) {
        if(player === 1){
            $scope.playerData.player1 = e.toElement.innerHTML;
        } else if (player === 2){
            $scope.playerData.player2 = e.toElement.innerHTML;
        }
    };

    $scope.startGame = function() {
        $scope.start = true;
    };

    $scope.rewardWinner = function() {

    };

});

function successWord(){
    var words = ['Great', 'Yea', 'Radical', 'Good', 'Awesome', 'Fantastic',
                      'All right', 'Beautiful', 'Bingo', 'Far out'];
    var rand = Math.floor((Math.random() * 10) + 1);
    return words[rand-1];
}
