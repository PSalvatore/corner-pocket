<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () {
    Route::resource('players', 'PlayerController',
        ['only' => ['index', 'store', 'update']]
    );
});

Route::any('{path?}', function() {
    return File::get(public_path() . '/home.html');
})->where("path", ".+");
