<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Image::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $image = Image::create($request->all());

        return new ResponseResource($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new ResponseResource(Image::where('id_collection', '=', $id)->get());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::find($id);
        $image->delete();

        return new ResponseResource($image);
    }

    public function resizeImage($image)
    {
        $imagePath = $image->store('public/images');
        $imageFullPath = storage_path('app/' . $imagePath);

        $resizeImageInfor = Image::make($image);
        $imageWidth = $resizeImageInfor->getWidth();
        $imageHeight = $resizeImageInfor->getHeight();

        $newWidth = $imageWidth * 0.4;
        $newHeight = $imageHeight * 0.4;

        $resizedImage = Image::make($imageFullPath)
            ->resize($newWidth, $newHeight)
            ->save($imageFullPath);

        return $imagePath;
    }

    public function uploadImage(Request $request)
    {
        $image = $request->file('image');
        $imagePath = $this->resizeImage($image);

        return response()->json([
            'message' => 'Image resized successfully',
            'image_path' => Storage::url($imagePath),
        ]);
    }

    public function sort(Request $request)
    {
        $datas =  $request->input();

        foreach ($datas as $data) {
            DB::table('image')
                ->where("id", $data['id'])
                ->update(["index" => $data['index']]);
        }

        return [];
    }
}
