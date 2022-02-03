<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Rol;
use App\Models\RolPermission;
use Illuminate\Http\Request;
use \Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
    public function getPermissionByRol(Request $request){
        try{
            $user = RolPermission::join('permissions','rol_permissions.permission_id','permissions.id')->select('permissions.*')->where('rol_id',$request->input('rol_id'))->get();
           
                return response([
                    'data'=>$user,
                ]);
          
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
        $permisos = $request->input('permisos');
        $role = Rol::create(['name' => $request['nombre']]);
        foreach ($permisos as $value) {
           RolPermission::create(['rol_id' => $role->id, 'permission_id' => $value['id']]);
        }
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
    public function obtenerPermisosAuth(){

        $user = User::find(Auth::id());
        if($user!=null){
            $data = RolPermission::join('permissions','rol_permissions.permission_id','permissions.id')->select('permissions.*')->where('rol_id',$user->rol_id)->get();
            return response([
                'data'=>$data,
                'type'=>'success',
                'message'=>'Registro exitoso'                                                                                                                         
            ]);
        }else{
            return response([
                'data'=>[],
                'type'=>'success',
                'message'=>'Registro exitoso'                                                                                                                         
            ]);
        }
    }
    public function editar(Request $request,$id)
    {
        try {
            //VACIOS

            $vacios = Validator::make($request->all(), [
                'nombre' => 'required',
            ]);
            if ($vacios->fails()) {
                return response([
                    'message' => "No debe dejar campos vacíos",
                    'type' => "error",
                ]);
            }

                $role= Rol::find($id);
                $role->name = $request->input('nombre');
                $role->save();
                //ELIMINAR PERMISOS ANTERIORES
                $permisos = $request->input('permisos');

                if(count($permisos)>0){
                    RolPermission::where('rol_id',$id)->delete();

                    
                    foreach ($permisos as $value) {
                        RolPermission::create(['rol_id' => $role->id, 'permission_id' => $value['id']]);
                     }
                }
               

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
