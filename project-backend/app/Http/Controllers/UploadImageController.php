<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadImageController extends Controller
{
    public function resizeImage($image)
    {
        $imagePath = $image->store('public/images');
        $imageFullPath = storage_path('app/' . $imagePath);

        $resizeImageInfor = Image::make($image);
        $imageWidth = $resizeImageInfor->getWidth();
        $imageHeight = $resizeImageInfor->getHeight();

        $newWidth = $imageWidth * 0.8;
        $newHeight = $imageHeight * 0.8;

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
}
