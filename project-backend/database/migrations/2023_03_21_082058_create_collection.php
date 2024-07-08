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
        Schema::create('collection', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('');
            $table->integer('hearts')->default(0);
            $table->integer('views')->default(0);
            $table->boolean('status')->default(true);
            $table->integer('type')->default(1);
            $table->string('url_thumbnail')->default('');
            $table->integer('index')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collection');
    }
};
