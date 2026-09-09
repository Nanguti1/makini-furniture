<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = ['title','subtitle','image','mobile_image','link','link_type','placement','starts_at','ends_at','is_active','sort_order'];

    protected function casts(): array
    {
        return ['starts_at'=>'datetime','ends_at'=>'datetime','is_active'=>'boolean'];
    }
}
