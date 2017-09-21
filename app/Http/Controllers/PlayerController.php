<?php

namespace App\Http\Controllers;

use App\Player;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
// use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class PlayerController extends Controller
{
    public function index(Request $request)
    {
        return Player::all();
        // return DB::table('players')->select('*')->get();
    }

    /**
     * Create a new player instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Validate the request...

        $player = new Player;

        $player->name = $request->input('name');
        $player->save();

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * update player instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request)
    {
        // Validate the request...

        Player::where('name', $request->input('player1'))->increment('games_played', 1);
        Player::where('name', $request->input('player2'))->increment('games_played', 1);
        Player::where('name', $request->input('winner'))->increment('wins', 1);

        return response()->json([
            'success' => true
        ]);
    }
}
