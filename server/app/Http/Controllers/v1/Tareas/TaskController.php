<?php

namespace App\Http\Controllers\v1\Tareas;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        try {
            $data = Task::join('users', 'users.id', '=', 'tasks.asigned_to')
            ->where('users.rol_id',2)
                ->select('tasks.*', 'users.names as user')
                ->get();
            return json_encode([
                "status" => "200",
                'data'=>$data,
                "message" => 'Data obtenida con éxito',
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
   
    public function usersTasks(Request $request)
    {
        try {
            $userId = $request->input('user_id');
            $desde = $request->input('desde');
            $hasta = $request->input('hasta');

            if(is_null($userId)){
                $data = User::where('rol_id',2)->selectRaw("(select count(*) from tasks  where tasks.asigned_to = users.id) as total, (select count(*) from tasks where tasks.asigned_to = users.id and tasks.is_complete = 1) as completas, users.names||' '||users.last_names as user")
                ->get();
            }else{
                $data = User::where('rol_id',2)->where('id',$userId)->selectRaw("(select count(*) from tasks  where tasks.asigned_to = users.id) as total, (select count(*) from tasks where tasks.asigned_to = users.id and tasks.is_complete = 1) as completas, users.names||' '||users.last_names as user")
                ->get();
            }
            
            return json_encode([
                "status" => "200",
                'data'=>$data,
                "message" => 'Data obtenida con éxito',
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
    public function tareasTotales(Request $request)
    {
        try {
            $userId = $request->input('user_id');

            $data=[];
            if(is_null($userId)){
                $data = Task::selectRaw("(select count(*) from tasks  ) as total, (select count(*) from tasks where   tasks.is_complete = 1) as completas,(select count(*) from tasks where  tasks.is_complete = 0) as pendientes")
                ->first();
            }else{
                $data = Task::where('asigned_to',$userId)->selectRaw("(select count(*) from tasks  where asigned_to=$userId ) as total, (select count(*) from tasks where   tasks.is_complete = 1 and asigned_to=$userId) as completas,(select count(*) from tasks where  tasks.is_complete = 0 and  asigned_to=$userId) as pendientes")
                ->first();
            }
            $final = [
                "pendientes"=>($data->total!=0?$data->pendientes/$data->total:0)*100,
                "completas"=>($data->total!=0?$data->completas/$data->total:0)*100,
            ];
            return json_encode([
                "status" => "200",
                'data'=>$final,
                "message" => 'Data obtenida con éxito',
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
    public function pendingTask(Request $request)
    {
        try {
            $userId = $request->input('user_id');
            $noCompletadas=0;
            $completadas=0;
            if(is_null($userId)){
                $noCompletadas = Task::where('is_complete', 0)->count();
                $completadas = Task::where('is_complete', 1)->count();
            }else{
                $noCompletadas = Task::where('is_complete', 0)->where('asigned_to',$userId)->count();
                $completadas = Task::where('is_complete', 1)->where('asigned_to',$userId)->count();
            }
            return json_encode([
                "status" => "200",
                'data'=>[
                    'incompletas'=>$noCompletadas,
                    'completas'=>$completadas
                ],
                "message" => 'Data obtenida con éxito',
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
    public function indexAuth()
    {
        try {
            $data = Task::join('users', 'users.id', '=', 'tasks.user_id')
                ->select('tasks.*', 'users.names as user')
                ->where('tasks.asigned_to', Auth::user()->id)
                ->get();
            return json_encode([
                "status" => "200",
                'data'=>$data,
                "message" => 'Data obtenida con éxito',
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
    public function create(Request $request)
    {
        try {
            $request['user_id']=Auth::id();
            Task::create($request->all());
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
        $data = Task::find($id);
        return json_encode([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Task::find($id);
            $co->update($request->all());
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
        $data = Task::find($id);
        $data->delete();
        return json_encode([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
