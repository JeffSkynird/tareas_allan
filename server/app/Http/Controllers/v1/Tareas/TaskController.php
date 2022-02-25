<?php

namespace App\Http\Controllers\v1\Tareas;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        try {
            $data = Task::select('tasks.*')
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
              //  $data = User::where('rol_id',2)->selectRaw("(select count(*) from tasks  where tasks.asigned_to = users.id) as total, (select count(*) from tasks where tasks.asigned_to = users.id and tasks.is_complete = 1) as completas, users.names||' '||users.last_names as user")->get();
               // $data = User::selectRaw("(select count(*) from task_users where percent=100) as total, users.names||' '||users.last_names as user" )->get();
                $data = User::join('task_users', 'task_users.user_id', '=', 'users.id')->selectRaw("(select count(*) from task_users where percent=100 and users.id=task_users.user_id) as total, users.names||' '||users.last_names as user" )->get();
            }else{
               // $data = User::where('rol_id',2)->where('id',$userId)->selectRaw("(select count(*) from tasks  where tasks.asigned_to = users.id) as total, (select count(*) from tasks where tasks.asigned_to = users.id and tasks.is_complete = 1) as completas, users.names||' '||users.last_names as user")->get();
               $data = User::where('id',$userId)->selectRaw("(select count(*) from task_users where percent=100) as total, users.names||' '||users.last_names as user" )->get();
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
    public function showAsigned($id){
        try {
            $data = TaskUser::join('users','task_users.user_id','users.id')->where('task_id',$id)->select('users.*','task_users.percent')->get();
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
                ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->where('task_users.user_id', Auth::user()->id)
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
    public function create(Request $request)
    {
        try {
            $asigned = $request->input('asigned_to');
            $data = $request->input('task');
            $data['user_id']=Auth::id();
            $data['percent']=0;
            $task = Task::create($data);

            foreach ($asigned as  $value) {
                TaskUser::create( [
                    'user_id'=>$value['id'],
                    'task_id'=>$task->id
                ]);
            }
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
            $task = $request->input('task');
            $asigned = $request->input('asigned_to');
            $value = $request->input('value_user');
            $co = Task::find($id);
            $co->update($task);

            if($value==null){

                //ELimina los registros anteriores
                TaskUser::where('task_id',$id)->delete();
                foreach ($asigned as  $value2) {
                    TaskUser::create( [
                        'user_id'=>$value2['id'],
                        'task_id'=>$id
                    ]);
                }

            }else{
                TaskUser::where([
                    'task_id'=>$id,
                    'user_id'=>Auth::id()
                ])->update(['percent'=>$value]);

                //ACTUALIANDO PORCENTAJE GLOBAL
                $sum = TaskUser::where('task_id',$id)->sum('percent');
                $count = TaskUser::where('task_id',$id)->count();
                $total = $sum/$count;
                if($total==100){
                    $co->update(['percent'=>$sum/$count,'is_complete'=>1]);
                }else{
                    $co->update(['percent'=>$sum/$count]);
                }
            

            }




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
