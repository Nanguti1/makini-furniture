<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','order_number','status','currency','subtotal','discount_total','shipping_total','tax_total','grand_total','billing_first_name','billing_last_name','billing_company','billing_phone','billing_address_line_1','billing_address_line_2','billing_city','billing_state','billing_postal_code','billing_country','shipping_first_name','shipping_last_name','shipping_company','shipping_phone','shipping_address_line_1','shipping_address_line_2','shipping_city','shipping_state','shipping_postal_code','shipping_country','metadata'];

    protected function casts(): array
    {
        return ['status'=>\App\Enums\OrderStatus::class,'subtotal'=>'decimal:2','discount_total'=>'decimal:2','shipping_total'=>'decimal:2','tax_total'=>'decimal:2','grand_total'=>'decimal:2','metadata'=>'array'];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function items(): HasMany { return $this->hasMany(OrderItem::class); }
    public function orderItems(): HasMany { return $this->hasMany(OrderItem::class); }
}
