<?php

namespace App\Data;

use App\Models\Price;

readonly class EffectivePrice
{
    public function __construct(
        public string $amount,
        public string $currency,
        public string $type,
        public ?Price $source = null,
    ) {}
}
