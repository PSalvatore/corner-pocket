<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Corner Pocket</title>

        <!-- Scripts -->
        <script src="/js/angular/angular.js"></script>
        <script src="/js/angular-route/angular-route.js"></script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        Hello, World, this is angular and to prove it, there is a computation: 5 + 3 == {{ 5 + 3 }}
        <h1 class="main-header">Corner Pocket</h1>
        <div class="record-result-container">
            <label>Record Result</label>
            <div class="player-select-container">
                <form>
                    <label>Player 1</label>
                    <input id="player1" type="text"/>
                    <div class='vs'>vs</div>
                    <label>Player 2</label>
                    <input id="player2" type="text"/>
                </form>
            </div>
        </div>
        <div class="add-player-container">
            <label>Add Player</label>
            <input id="add-player" type="text"/>
            <button type="button" class="btn btn-primary">Add</button>
        </div>
        <div class="leaderboard-container">
            <div>Leaderboard</div>
        </div>
    </body>
</html>
