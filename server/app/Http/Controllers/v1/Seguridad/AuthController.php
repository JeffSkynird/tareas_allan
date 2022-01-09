<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $vacios = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
            ]);
            if ($vacios->fails()) {
                return response([
                    'message' => "Revise los campos ingresados",
                    'type' => "error",
                ]);
            }
            $credentials = [
                'email' => $request['email'],
                'password' => $request['password'],
            ];
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;
                return response([
                    "status" => "200",
                    'message' => 'Inicio de sesiòn correcto',
                    'token' => $token,
                    'user' => $user
                ]);
            }else{
                return response([
                    "status" => "500",
                    'message' => 'Credenciales incorrectas',
                    'type'=>'error'
                ]);
            }
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function logout()
    {
        try {
            $user = Auth::user()->token();
            $user->revoke();
            return json_encode([
                "status" => "200",
                "message" => 'Sesión finalizada correctamente',
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
}
