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
        Schema::create('infor', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('title');
            $table->string('url_avatar');
            $table->string('phone_title');
            $table->string('phone_number');
            $table->string('url_fb');
            $table->string('address');
            $table->integer('project_views');
            $table->integer('appreciations');
            $table->integer('followers');
            $table->integer('follwings');
            $table->string('url_banner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infor');
    }
};
