<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function delete($id)
    {
        try {
            $role= Permission::find($id);
            $role->delete();
            return response([
                "message" => "Borrado exitoso",
                "type" => "success",
            ]);
        } catch (\Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
                'type' => 'error',
            ]);
        }
    }
    public function getPermissionByUser(Request $request){
        try{
            $user = User::find($request->input('user_id'));
            if($user!=null){
           
                   $rol = Rol::find($user->rol_id);
                    return response([
                        'role'=>$rol->name,
                    ]);

                
            }else{
                return response([
                    'role'=>'',
                ]);
            }
        }catch(\Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }
    }
    public function create(Request $request){
        try{
       
        $role = Permission::create(['name' => $request['nombre']]);
        return response([
            'data'=>$role,
            'type'=>'success',
            'message'=>'Registro exitoso'                                                                                                                         
        ]);
    
        }catch(\Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }
    }
    public function editar(Request $request,$id)
    {
        try {
            //VACIOS

            $vacios = Validator::make($request->all(), [
                'name' => 'required',
            ]);
            if ($vacios->fails()) {
                return response([
                    'message' => "No debe dejar campos vacíos",
                    'type' => "error",
                ]);
            }

                $role= Permission::find($id);
                $role->name = $request->input('name');
                $role->save();
                return response([
                    'message' => "Edición exitosa",
                    'type' => 'success',
                ]);

        } catch (\Exception $exception) {
            return response([
                'message' =>  $exception->getMessage(),
                'type' => 'error',
            ]);
        }
    }
    public function index(){
        try{
            $roles = Permission::all();

            return response([
                'permisos'=>$roles
            ],200);
        }catch(\Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }

    }

}
