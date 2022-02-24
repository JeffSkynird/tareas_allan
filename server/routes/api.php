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
    Route::post('roles', 'App\Http\Controllers\v1\Seguridad\RoleController@create');
    Route::delete('roles/{id}', 'App\Http\Controllers\v1\Seguridad\RoleController@deleteRole');
    Route::put('roles/{id}', 'App\Http\Controllers\v1\Seguridad\RoleController@editar');

    Route::get('get_by_role', 'App\Http\Controllers\v1\Seguridad\RoleController@getPermissionByRol');

    
    Route::get('user/role', 'App\Http\Controllers\v1\Seguridad\RoleController@getRoleByUser');
    Route::get('user_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@usersTasks');


    Route::get('total_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@tareasTotales');

    Route::get('permissions', 'App\Http\Controllers\v1\Seguridad\PermissionController@index');
    Route::delete('permissions/{id}', 'App\Http\Controllers\v1\Seguridad\PermissionController@delete');
    Route::put('permissions/{id}', 'App\Http\Controllers\v1\Seguridad\PermissionController@update');
    Route::post('permissions', 'App\Http\Controllers\v1\Seguridad\PermissionController@create');

    
    Route::get('task_users/{id}', 'App\Http\Controllers\v1\Tareas\TaskController@showAsigned');

    Route::middleware('auth:api')->group(function () {
        Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
        Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');
        Route::put('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@update');
        Route::get('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@index');
        Route::get('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@show');
        Route::delete('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@delete');

        Route::get('get_permissions', 'App\Http\Controllers\v1\Seguridad\RoleController@obtenerPermisosAuth');

        

        Route::get('tareas_auth', 'App\Http\Controllers\v1\Tareas\TaskController@indexAuth');
        Route::get('pending_tasks', 'App\Http\Controllers\v1\Tareas\TaskController@pendingTask');


        
        
    Route::put('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@update');
    Route::post('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@create');
    Route::get('tareas', 'App\Http\Controllers\v1\Tareas\TaskController@index');
    Route::put('tareas/{id}', 'App\Http\Controllers\v1\Tareas\TaskController@update'); 
    });
});
