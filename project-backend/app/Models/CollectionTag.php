<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionTag extends Model
{
    use HasFactory;


    protected $fillable = [
        'id_collection', 'id_tag'
    ];

    protected $primaryKey = 'id';
    protected $table = 'collection_tag';
}
