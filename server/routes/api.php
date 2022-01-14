<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {
    Route::group([
        'prefix' => 'auth',
    ], function () {
        Route::post('login', 'App\Http\Controllers\v1\Seguridad\AuthController@login');
        Route::post('logout', 'App\Http\Controllers\v1\Seguridad\AuthController@logout')->middleware('auth:api');
    });
    Route::post('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@create');
    Route::get('roles', 'App\Http\Controllers\v1\Seguridad\RoleController@roles');
    Route::get('user/role', 'App\Http\Controllers\v1\Seguridad\RoleController@getRoleByUser');
    Route::get('user_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@usersTasks');


    Route::get('total_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@tareasTotales');

    


    Route::middleware('auth:api')->group(function () {
        Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
        Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');
        Route::put('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@update');
        Route::get('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@index');
        Route::get('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@show');
        Route::delete('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@delete');

        
        Route::get('tareas_auth', 'App\Http\Controllers\v1\Tareas\TaskController@indexAuth');
        Route::get('pending_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@pendingTask');


        
        
    Route::put('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@update');
    Route::post('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@create');
    Route::get('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@index');
    Route::put('tareas/{id}', 'App\Http\Controllers\v1\Tareas\TaskController@update'); 
    });
});
