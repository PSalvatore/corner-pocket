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
        return DB::table('players')->select('*')->get();
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
        Log::info('~~~~~~~~~~~~~~~~Name: '.$request->input('name'));
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
	Log::info("update");
	Log::info("request: ". $request);
	
	DB::table('players')->increment('games_played', 1, ['name' => $request->input('player1')]);
	DB::table('players')->increment('games_played', 1, ['name' => $request->input('player2')]);
	DB::table('players')->increment('wins', 1, ['name' => $request->input('winner')]);
	
//        $player = DB::table('players')->where('name', $request->input('name'))->first();
//	$player->games_played .= 1;
//	$player->save();
	
        return response()->json([
            'success' => true
        ]);
    }
}
