<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('infor', function (Blueprint $table) {
            $table->string('url_fanpage')->default('');
            $table->string('cty_name')->default('');
            $table->string('mst')->default('');
            $table->string('location')->default('');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('infor', function (Blueprint $table) {
            //
        });
    }
};
