<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\Request;
use App\Http\Resources\ResponseResource;
use App\Models\CollectionTag;
use App\Models\Image;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newArr = [];
        $collections = DB::table('collection')->get();
        foreach ($collections as $collection) {
            error_log($collection->id);

            $tags = DB::table('collection_tag')
                ->where('id_collection', $collection->id)
                ->pluck('id_tag');
            $collection->tags = $tags;
            array_push($newArr, $collection);
        }
        return ['data' => $newArr];
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
        $collection = new Collection();
        $collection->name = $request->get('name');
        $collection->url_thumbnail = $request->get('url_thumbnail');
        $collection->hearts = $request->get('hearts');
        $collection->views = $request->get('views');
        $collection->description = $request->get('description');

        $collection->save();

        $tags = $request->get('tags');
        foreach ($tags as $item) {
            $collectionTag = new CollectionTag();
            $collectionTag->id_collection = $collection->id;
            $collectionTag->id_tag = $item;
            $collectionTag->save();
        }


        return new ResponseResource($tags);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $collection = Collection::find($id);
        $tags = DB::table('collection_tag')
            ->where('id_collection', $collection->id)
            ->pluck('id_tag');
        $collection->tags = $tags;

        return new ResponseResource($collection);
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
    public function update(Request $request)
    {
        DB::table('collection')
            ->where('id', ($request->get('id')))
            ->update([
                "name" => $request->get('name'),
                "url_thumbnail" => $request->get('url_thumbnail'),
                "hearts" => $request->get('hearts'),
                "views" => $request->get('views'),
                "status" => $request->get('status'),
                "description" => $request->get('description'),
            ]);

        $tags = $request->get('tags');

        $collectionTags = DB::table('collection_tag')->where('id_collection', $request->get('id'))->get();

        //** Xóa các phần tags ko dc set */
        foreach ($collectionTags as $item) {
            $found = false;
            foreach ($tags as $tag) {
                if ($tag == $item->id_tag) {
                    $found = true;
                    break;
                }
            }

            if ($found === false) {
                DB::table('collection_tag')->where('id_collection', $item->id_collection)->delete();
            }
        }

        //** Thêm tag mới */
        foreach ($tags as $tag) {
            $collectionTag = CollectionTag::firstOrCreate([
                'id_tag' => $tag,
                'id_collection' => $request->get('id')
            ], []);

            if (!$collectionTag->exists) {
                $collectionTag->save();
            }
        }


        return new ResponseResource([]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $collection =  Collection::find($id);
        $collection->delete();

        return new ResponseResource($collection);
    }

    public function storeVideoCollection(Request $request)
    {
        $collection = new Collection();
        $collection->name = $request->get('name');
        $collection->url_thumbnail = $request->get('url_thumbnail');
        $collection->hearts = $request->get('hearts');
        $collection->views = $request->get('views');
        $collection->description = $request->get('description');
        $collection->type = 2;

        $collection->save();

        $tags = $request->get('tags');
        foreach ($tags as $item) {
            $collectionTag = new CollectionTag();
            $collectionTag->id_collection = $collection->id;
            $collectionTag->id_tag = $item;
            $collectionTag->save();
        }

        $image = new Image();
        $image->src = $request->get('src');
        $image->id_collection =  $collection->id;
        $image->type = 2;
        $image->save();

        return new ResponseResource([]);
    }

    public function increaseView(String $id)
    {
        $record = Collection::find($id);
        $record->increment('views');
        $record->save();

        return $record;
    }

    public  function getVideos()
    {
        $collections = DB::table('collection')
            ->where('type', 2)
            ->get();

        foreach ($collections as $collection) {
            $videoSrc = DB::table('image')->where('id_collection', $collection->id)->first();
            $collection->src = $videoSrc->src;
        }

        return new ResponseResource($collections);
    }
    public  function updateVideoCollection(Request $request)
    {
        DB::table('collection')
            ->where('id', ($request->get('id')))
            ->update([
                "name" => $request->get('name'),
                "url_thumbnail" => $request->get('url_thumbnail'),
                "hearts" => $request->get('hearts'),
                "views" => $request->get('views'),
                "status" => $request->get('status'),
                "description" => $request->get('description'),
            ]);

        $tags = $request->get('tags');

        $collectionTags = DB::table('collection_tag')->where('id_collection', ($request->get('id')))->get();

        //** Xóa các phần tags ko dc set */
        foreach ($collectionTags as $item) {
            $found = false;
            foreach ($tags as $tag) {
                if ($tag === $item->id_tag) {
                    $found = true;
                    break;
                }
            }

            if ($found === false) {
                DB::table('collection_tag')->where('id_collection', $item->id_collection)->delete();
            }
        }

        //** Thêm tag mới */
        foreach ($tags as $tag) {
            $collectionTag = CollectionTag::firstOrCreate([
                'id_tag' => $tag,
                'id_collection' => $request->get('id')
            ], []);

            if (!$collectionTag->exists) {
                $collectionTag->save();
            }
        }

        DB::table('image')
            ->where('id_collection', $request->get('id'))
            ->update([
                'src' => $request->get('src')
            ]);

        return new ResponseResource([]);
    }

    public function getVideoByID(string $id)
    {
        $collection = Collection::find($id);

        $tags = DB::table('collection_tag')
            ->where('id_collection', $collection->id)
            ->pluck('id_tag');
        $collection->tags = $tags;

        $videoSrc = DB::table('image')->where('id_collection', $id)->first();
        $collection->src = $videoSrc->src;

        return new ResponseResource($collection);
    }

    public function deleteVideoByID(string $id)
    {
        $collection = Collection::find($id);
        $collection->delete();

        return new ResponseResource($collection);
    }

    public function sort(Request $request)
    {
        $datas =  $request->input();

        foreach ($datas as $data) {
            DB::table('collection')
                ->where("id", $data['id'])
                ->update(["index" => $data['index']]);
        }

        return [];
    }
}
