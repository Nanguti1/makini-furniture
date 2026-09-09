<?php
namespace App\Enums;
enum StockMovementType: string { case Purchase = 'purchase'; case Sale = 'sale'; case Adjustment = 'adjustment'; case Return = 'return'; case Transfer = 'transfer'; case Damage = 'damage'; }
