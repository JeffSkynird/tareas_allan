<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
  
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'PATCH':
            case 'PUT':
                return $this->update();
                break;
            case 'POST':
                return $this->store();
                break;
            case 'DELETE':
                return $this->destroy();
                break;
            default:
            return $this->view();
            break;
        }
    }
    /**
     * Get the validation rules that apply to the get request.
     *
     * @return array
     */
    public function view()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation rules that apply to the post request.
     *
     * @return array
     */
    public function store()
    {
        return [
            'email' => 'required|email:rfc,dns|unique:users',
            'dni'=>'required',
            'names' => 'required',
            'last_names' => 'required',
            'password' => 'required',
            'rol_id'=>'required'
            ];
    }

    /**
     * Get the validation rules that apply to the put/patch request.
     *
     * @return array
     */
    public function update()
    {
        if(is_numeric($this->id)){
            return [
                'id' => 'required|integer|exists:users,id',
                'email' => 'required|email:rfc,dns|unique:users,email,' . $this->id,
                'dni'=>'required',
                'names' => 'required',
                'last_names' => 'required'
            ];
        }else{
            return [
                'id' => 'required|integer|exists:users,id'
            ];
        }
        
    }

    /**
     * Get the validation rules that apply to the delete request.
     *
     * @return array
     */
    public function destroy()
    {
        return [
            'id' => 'required|integer|exists:users,id'
        ];
    }
    protected function prepareForValidation() 
    {
        $idUser=$this->route('id');
        if(is_null($idUser)){
            if(Auth::check()){
                $idUser=(Auth::user())->id;
            }
        }
        $this->merge(['id' => $idUser]);
    }
}
