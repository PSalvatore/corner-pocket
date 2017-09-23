<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $table = 'players';
    protected $appends = ['rank', 'win_percentage'];

    public function getRankAttribute()
    {
        return $this->newQuery()->where('wins', '>=', $this->wins)->count();
    }

    public function getWinPercentageAttribute()
    {
        if($this->games_played == 0){
            $win_percentage = 0;
        } else {
            $win_percentage = $this->wins / $this->games_played;
        }
        return $win_percentage;
    }
}
