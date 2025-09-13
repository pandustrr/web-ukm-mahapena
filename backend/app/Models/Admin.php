<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $fillable = ['username', 'password', 'api_token'];
    protected $hidden = ['password', 'api_token'];
    public function getAuthIdentifierName()
    {
        return 'id';
    }
}
