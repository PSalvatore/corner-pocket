angular.module('mainCtrl', []).controller('main', function($scope, $http, Player, $timeout) {
    // object to hold all the data for the new player form
    $scope.playerData = {};

    // loading variable to show the spinning loading icon
    $scope.loading = true;

    // define messaging stuff
    $scope.addMessage = "";
    $scope.showAddMessage = false;
    $scope.gameMessage = "";
    $scope.showGameMessage = false;

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
            $scope.addMessage =  successWord() + "! " + $scope.playerData.name + " has been added!";
            $scope.showAddMessage = true;
            $scope.loading = false;
            $timeout(function() {
                $scope.showAddMessage = false;
                $scope.addMessage = "";
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
            $scope.player1DropShow = false;
        } else if (player === 2){
            $scope.playerData.player2 = e.toElement.innerHTML;
            $scope.player2DropShow = false;
        }
    };

    $scope.startGame = function() {
        $scope.start = true;
    };

    $scope.setWinner = function(winning_player) {
    	$scope.playerData.winner = winning_player;
    	$scope.recordGame();
    };

    $scope.recordGame = function() {
    	Player.update($scope.playerData).then(function (success){
    	    $scope.gameMessage = "Congrats on the win, " + $scope.playerData.winner +  "!";
            $scope.showGameMessage = true;
            $timeout(function() {
                $scope.showGameMessage = false;
                $scope.gameMessage = "";
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
