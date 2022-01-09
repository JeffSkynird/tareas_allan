<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Models\Rol;
use Illuminate\Http\Request;
use \Validator;
use App\Models\User;
class RoleController extends Controller
{
    public function deleteRole($id)
    {
        try {
            $role= Rol::find($id);
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
    public function getRoleByUser(Request $request){
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
    public function exists($value,$array,$id){
        $normalize="ASCII//TRANSLIT";
        $res = false;
        foreach ($array as $i){
            if(strtolower(iconv( 'UTF-8', $normalize,$value))==strtolower(iconv( 'UTF-8', $normalize,$i->name))){
                if($i->id!=$id){
                    $res = true;
                }
            }
        }
        return $res;
    }
    public function create(Request $request){
        try{
       
        $role = Rol::create(['name' => $request['nombre']]);
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

                $role= Rol::find($id);
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
    public function roles(){
        try{
            $roles = Rol::all();

            return response([
                'roles'=>$roles
            ],200);
        }catch(\Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }

    }

}
