<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use \Validator;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class UsuarioController extends Controller
{
    public function index(){
        $usuarios = User::join('rols','rols.id','users.rol_id')->select('users.*','rols.name as rol')->get();
        return json_encode([
            "status" => "200",
            "data"=> $usuarios,
            "message" => 'Listado exitoso',
            "type" => 'success'
        ]);
    }
    public function asignRole($id_user,$rol){
        try{
   

            $user = User::find($id_user);
            $user->roles()->detach();
            $user->assignRole($rol);

            return response([
                'message'=>'Rol asignado correctamente'
            ],200);
        }catch(\Exception $exception){
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }
    }
    public function create(UserRequest $request)
    {
        try {
            $params = $request->validated();
            $params['user_id']=Auth::id();
            $us= User::create($params);
            return json_encode([
                "status" => "200",
                "message" => 'Registro exitoso',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function show($id)
    {
        $data = User::find($id);
        return json_encode([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function showAuth()
    {
        return json_encode([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => Auth::user(),
            "type" => 'success'
        ]);
    }
    public function update(UserRequest $request,$id){
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $rol = $request->input("rol_id");
      
        try {
            $user = User::find($id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            $user->rol_id = $rol;
            if(!is_null($password)){
                    $user->password=$password;
            }
            $user->save();
            return json_encode([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function updateAuth(UserRequest $request){
        $userAuth = Auth::user();
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $vacios = Validator::make($request->all(), [
            'names' => 'required',
            'last_names' => 'required',
            'email' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $user = User::find($userAuth->id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            if(!is_null($password)){
                $user->password=$password;
            }
            $user->save();

            return json_encode([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function delete($id)
    {
        $data = User::find($id);
        $data->delete();
        return json_encode([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
    public function upload(Request $request) {
        $validator = Validator::make($request->all(),[ 
            'file'  => 'required|mimes:png,jpg,jpeg,gif|max:2305',
      ]);   
       
      if($validator->fails()) {          
           
        return response([
            'message' => "Debe subir una imagen",
            'type' => "error",
        ]);                     
       } 
       if ($file = $request->file('file')) {
        $us = Auth::user();
      
        $name = $file->getClientOriginalName();
        $file->storeAs('public', $us->id."_".$name);

       
        $save = User::find($us->id);
        $save->image_path = "storage/".$us->id."_".$name;
        $save->save();
           
        return json_encode([
            "status" => "200",
            "message" => 'Actualización exitosa',
            "type" => 'success'
        ]);

    }

    }
}
