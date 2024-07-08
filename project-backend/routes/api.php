<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\CollectionTagController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InforController;
use App\Http\Controllers\UploadImageController;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;

Route::resource('infor', InforController::class);
Route::resource('collections', CollectionController::class);
Route::post('login', [InforController::class, 'login']);

Route::put('sort/collection', [CollectionController::class, 'sort']);
Route::put('increase/view/{id}', [CollectionController::class, 'increaseView']);

Route::post('videos', [CollectionController::class, 'storeVideoCollection']);
Route::get('videos', [CollectionController::class, 'getVideos']);
Route::put('videos/{id}', [CollectionController::class, 'updateVideoCollection']);
Route::get('videos/{id}', [CollectionController::class, 'getVideoByID']);
Route::delete('videos/{id}', [CollectionController::class, 'deleteVideoByID']);

Route::resource('tags', TagController::class);
Route::resource('image-details', ImageController::class);
Route::put('sort/images', [ImageController::class, "sort"]);

Route::post('upload-image', [UploadImageController::class, 'uploadImage']);
