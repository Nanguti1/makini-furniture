<?php
namespace App\Services\Orders;
class Money { public static function cents(string $amount): int { if (!preg_match('/^-?\d+(?:\.\d{1,2})?$/',$amount)) throw new \InvalidArgumentException('Invalid monetary amount.'); [$whole,$fraction]=array_pad(explode('.', $amount,2),2,''); return ((int)$whole*100)+(int)str_pad($fraction,2,'0'); } public static function decimal(int $cents): string { return sprintf('%d.%02d', intdiv($cents,100), abs($cents)%100); } }
