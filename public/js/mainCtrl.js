angular.module('mainCtrl', []).controller('main', function($scope, $http, $location, Player, $timeout) {
    // object to hold all the data for the new player form
    $scope.playerData = {};

    // loading variable to show the spinning loading icon
    $scope.loading = true;

    // define messaging stuff
    $scope.addMessage = "";
    $scope.showAddMessage = false;
    $scope.gameMessage = "";
    $scope.showGameMessage = false;

    $scope.go = function ( path ) {
        $location.path( path );
    };

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
        var input = $scope.playerData.name;
        console.log(input);
        if(input != '' && input != undefined){
            Player.save($scope.playerData).then(function (success){
                $scope.showErrorMessage = false;
                $scope.addMessage =  successWord() + "! " + $scope.playerData.name + " has been added!";
                $scope.showAddMessage = true;
                $scope.loading = false;
                $timeout(function() {
                    $scope.showAddMessage = false;
                    $scope.addMessage = "";
                    $scope.playerData.name = null;
                }, 5000);
            },function (error){
                var err_msg = error.data.errors.name;
                $scope.addErrorMessage =  "Oops! "+ err_msg;
                $scope.showErrorMessage = true;
                $scope.loading = false;
            });
        } else {
            $scope.addErrorMessage =  "Really?... You want your name to be whitespace. C'mon dude.";
            $scope.showErrorMessage = true;
            $scope.loading = false;
        }
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
        var p1 = $scope.playerData.player1;
        console.log('p1: ' + p1);
        var p2 = $scope.playerData.player2;
        if((p1 != '' && p1 != undefined) && (p2 != '' && p2 != undefined)){
            $scope.start = true;
        } else {
            $scope.recordErrorMessage = "Enter names for both players";
            $scope.showRecordErrorMessage = true;
        }

    };

    $scope.setWinner = function(winning_player) {
    	$scope.playerData.winner = winning_player;
    	$scope.recordGame();
    };

    $scope.recordGame = function() {
        $scope.loading = true;
    	Player.update($scope.playerData).then(function (success){
    	    $scope.gameMessage = "Congrats on the win, " + $scope.playerData.winner +  "!";
            $scope.showGameMessage = true;
            $scope.loading = false;
            $timeout(function() {
                $scope.showGameMessage = false;
                $scope.gameMessage = "";
            }, 5000);
    	},function (error){
            $scope.loading = false;
            console.log(error);
            $scope.recordErrorMessage = "Something went wrong";
            $scope.showRecordErrorMessage = true;
        });
    };

});

function successWord(){
    var words = ['Great', 'Yea', 'Radical', 'Good', 'Awesome', 'Fantastic',
                      'All right', 'Beautiful', 'Bingo', 'Far out'];
    var rand = Math.floor((Math.random() * 10) + 1);
    return words[rand-1];
}
