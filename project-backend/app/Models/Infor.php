<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'title', 'url_avatar', 'phone_title', 'phone_number', 'url_fb', 'address', 'project_views',
        'appreciations', 'followers', 'following', 'url_banner', "url_fanpage", "mst", "cty_name", "location", "url_message"
    ];

    protected $primaryKey = 'id';
    protected $table = 'infor';
}
