<?php
namespace App\Http\Requests\Admin;
use App\Enums\OrderStatus; use App\Models\Order; use Illuminate\Foundation\Http\FormRequest; use Illuminate\Validation\Rule;
class UpdateOrderStatusRequest extends FormRequest { public function authorize():bool{return $this->user()?->can('update',$this->route('order'))??false;} public function rules():array{return ['status'=>['required',Rule::enum(OrderStatus::class)]];} }
